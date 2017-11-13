import React = require('react')
import {
  default as Editor,
  createEditorStateWithText
} from 'draft-js-plugins-editor'
import {
  EditorState,
  ContentBlock,
  getDefaultKeyBinding,
  convertToRaw,
  RawDraftContentState,
  RichUtils,
  Modifier
} from 'draft-js'
import { DraftHandleValue } from './interface.editor'
import { Serlizer } from './utils/serializer'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import 'draft-js-side-toolbar-plugin/lib/plugin.css'
import 'draft-js-image-plugin/lib/plugin.css'
import 'draft-js-alignment-plugin/lib/plugin.css'

import { is } from 'immutable'
import { isUrl } from '../../utils/url'
import { focusSelectionAfter } from './utils/operaBlock'

import './draft.less'
import './style.less'
interface EditorProps {
  plugins?: any[]
  decorators?: any[]
  editorState?: EditorState
  content?: RawDraftContentState
  placeholder?: string
  onChange?: (s: EditorState) => any
  readonly?: boolean
  autoFocus?: boolean
}

export default class JiglooEditor
  extends React.Component<EditorProps, any> {
  public static placeholder = ' '
  public editor

  serializer = Serlizer.serialize

  state = { editorState: EditorState.createEmpty() }
  /**
   * A bug was here .
   * If call the method(focus) ,decorators will not work
   */
  componentWillMount() {
    // this.focus()

    if (this.props.editorState) {
      this.setState({ editorState: this.props.editorState })
    } else if (this.props.content) {
      const editorState = EditorState
        .push(this.state.editorState, Serlizer.deserialize(this.props.content), 'change-block-data')
      this.setState({ editorState })
    }
  }

  onChange = (editorState) => {

    this.setState({ editorState })

    if (this.props.onChange) {
      this.props.onChange(editorState)
    }
  };

  shouldComponentUpdate(nextProps: EditorProps, nextState) {
    if (nextState.editorState && !is(nextState.editorState, this.state.editorState)) {
      return true
    }

    if (nextProps.readonly !== this.props.readonly) {
      return true
    }

    return false
  }

  focus = () => {
    this.editor.getEditorRef().focus()
  };

  hasFocus() {
    return this.state.editorState
      .getSelection()
      .getHasFocus()
  }

  private blockStyleFn = (block: ContentBlock) => {
    const type = block.getType()
    if (type === 'unstyled') {
      return 'paragraph'
    }

    if (type === 'header-one' || type === 'header-two') {
      return 'editor-title serif'
    }

    return null
  }

  handleReturn = (...args): DraftHandleValue => {
    const editorState = this.state.editorState;
    const blockKey = editorState.getSelection().getAnchorKey()
    const block = editorState.getCurrentContent().getBlockForKey(blockKey)
    if (block) {
      if (args[0].shiftKey) {
        if (block.getType() === 'atomic') {
          return 'handled'
        } else if (block.getType() !== 'unstyled') {
          this.onChange(RichUtils.insertSoftNewline(editorState))
          return 'handled'
        }
      } else {
        let newEditorState = focusSelectionAfter(editorState, block.getKey());
        this.onChange(newEditorState);
        return 'handled';
      }

    }

    return 'not-handled'
  }

  handlePastedText = (text: string, html: string): DraftHandleValue => {
    const editorState = this.state.editorState;
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    // TODO parsing the url
    if (text && isUrl(text.trim())) {
      let newContentState = Modifier.insertText(contentState, selectionState, text)
      let editorStateAfterPaste = EditorState.push(this.state.editorState, newContentState, 'insert-characters')
      this.onChange(editorStateAfterPaste)
    }
    // TODO html to block
    if (html) {

    }
    return 'not-handled'
  }

  onTab = (e: Event): DraftHandleValue => {
    // prevent default page jump
    e.preventDefault()
    return 'handled'
  }


  render() {
    const placeholder = this.props.placeholder || JiglooEditor.placeholder
    return (
      <div className="jigloo-editor">
        <Editor
          ref={e => this.editor = e}
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={this.props.plugins || []}
          handleReturn={this.handleReturn}
          handlePastedText={this.handlePastedText}
          decorators={this.props.decorators || []}
          blockStyleFn={this.blockStyleFn}
          placeholder={placeholder}
          readOnly={this.props.readonly}
          onTab={this.onTab}
        />

        {this.props.children}
      </div>
    );
  }
}
