import React = require('react')
import {
  default as Editor,
  createEditorStateWithText
} from 'draft-js-plugins-editor'
import {
  EditorState,
  ContentState,
  ContentBlock,
  getDefaultKeyBinding,
  convertToRaw,
  RawDraftContentState,
  RichUtils,
  Modifier,
  genKey,
  BlockMapBuilder,
  CharacterMetadata
} from 'draft-js'
import { convertFromHTML as customConvertFromHtml } from 'draft-convert'

import { DraftHandleValue } from './interface.editor'
import { Serlizer } from './utils/serializer'
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'
import 'draft-js-side-toolbar-plugin/lib/plugin.css'
import 'draft-js-image-plugin/lib/plugin.css'
import 'draft-js-alignment-plugin/lib/plugin.css'

import { is, List, Repeat } from 'immutable'
import { isUrl, getEntityTypeByUrl } from "../../utils/url"
import { focusSelectionAfter, selectBlock, insertBlock,removeBlockFromBlockMap } from './utils/operaBlock'
import { types } from '../../constants/entityType'

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
  public editor;
  public serializer;
  constructor(props: EditorProps) {
    super(props)
    this.serializer = Serlizer.serialize
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }
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
  // componentDidMount() {
  //   if (!this.props.readonly) {
  //     this.focus()
  //   }
  // }
  onChange = (editorState) => {

    this.setState({ editorState })

    if (this.props.onChange) {
      this.props.onChange(editorState)
    }
  };
  getEditorState = (): EditorState => {
    return this.state.editorState;
  }
  getContentAndSelection = () => {
    let editorState = this.getEditorState()
    let contentState = editorState.getCurrentContent()
    let selectionState = editorState.getSelection()
    return {
      contentState,
      selectionState
    }
  }
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

  hasFocus = () => {
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
    const { contentState, selectionState } = this.getContentAndSelection()

    const blockKey = selectionState.getAnchorKey()
    const block = contentState.getBlockForKey(blockKey)

    const entityKey = block.getEntityAt(0);
    const entity = entityKey ? contentState.getEntity(entityKey) : null;


    if (block) {
      //解析网页 显示预览信息
      if (isUrl(block.getText())) {
        let newEditorState = selectBlock(editorState, block.getKey(), block.getLength())
        let contentState = newEditorState.getCurrentContent()
        let selectionState = newEditorState.getSelection()
        let newContentState = Modifier
          .setBlockType(contentState, selectionState, 'atomic')
          .createEntity(getEntityTypeByUrl(block.getText()), "MUTABLE", {
            type: getEntityTypeByUrl(block.getText()),
            title: '阿里云前端周刊 - 第 33 期交流交流放假时间家里就发了交流方式登记法律就是浪费就是垃圾房价私搭乱建法律手段减肥路上大家发了圣诞节见识到了废旧塑料房',
            description: '本周 React 16.1.0 版本发布，自该版本开始 React 不再发布到 Bower，解放路都结束了金粉世家分解落实经费落实放假了时代峻峰老实交代福建省两地分居狩猎僵尸两点就法律手段废旧塑料'+
            +'交付落地时间法律手段分解落实到积分鲁大师积分洛杉矶斐林试剂放假时间斐林试剂冯老师金粉世家地脚螺栓',
            src: block.getText(),
            previewImg: 'https://cdn-images-1.medium.com/fit/c/160/160/0*fAp3PSMaEwyk3ild.'
          })
        let lastEntityKey = newContentState.getLastCreatedEntityKey()
        newContentState = Modifier.replaceText(newContentState, selectionState, ' ', null, lastEntityKey);
        newEditorState = EditorState.push(editorState, newContentState, "change-block-type");
        newEditorState = focusSelectionAfter(newEditorState, block.getKey())
        this.onChange(newEditorState);
        return 'handled'
      }
      //shiftKey 如果是markdown则跳出 其余的block内换行
      if (args[0].shiftKey) {
        if (block.getType() === 'atomic') {
          return 'handled'
        } else if (block.getType() === 'code-block') {
          let newEditorState = focusSelectionAfter(editorState, block.getKey());
          this.onChange(newEditorState);
          return 'handled';
        } else if (block.getType() !== 'unstyled') {
          this.onChange(RichUtils.insertSoftNewline(editorState))
          return 'handled'
        }
      } else {
        //如果是引用 一级标题 二级标题则回车则新建新的 unstyle  block
        if (block.getType() === 'blockquote') {
          let newEditorState = focusSelectionAfter(editorState, block.getKey());
          this.onChange(newEditorState);
          return 'handled';
        }
      }
    }
    return 'not-handled'
  }
  //将img标签解析成image block映射算法
  getConvertOptions = () => {
    var { contentState } = this.getContentAndSelection()
    return {
      htmlToEntity: (nodeName, node: any) => {
        if (nodeName === 'img') {
          node.textContent = node.src
          return contentState.createEntity(
            'image',
            'MUTABLE',
            {
              valid: false,
              description: '',
              src: node.src
            }
          ).getLastCreatedEntityKey()
        } else if (nodeName === 'br') {
          // return null;
        } else if (nodeName === 'a') {
          // return contentState.createEntity(
          //   "image",
          //   'IMMUTABLE',
          //   { url: node.href }
          // ).getLastCreatedEntityKey()
        }
      },
      htmlToBlock: (nodeName, node) => {
        if (nodeName === 'img') {
          return {
            type: 'atomic',
            data: {}
          }
        }
      }
    }
  }
  handleKeyCommand = (command) => {
    switch (command) {
      case "backspace":
        return this.handleBackspace()
      default:
        return "not-handled"
    }
  }

  handleBackspace = () => {
    const editorState = this.getEditorState()
    const { contentState, selectionState } = this.getContentAndSelection()
    const block = contentState.getBlockForKey(selectionState.getAnchorKey())
    if (block.getType()==='atomic') {
      var removeEditor = removeBlockFromBlockMap(editorState, block.getKey());
      this.onChange(removeEditor)
      return "handled"
    }
    return "not-handled"
  }

  /**
   * 将粘贴的html修改为block
   * @param html
   */
  handleHtml = (html) => {
    let pastedContentState = customConvertFromHtml(this.getConvertOptions())(html)
    let blockMap = pastedContentState.getBlockMap()
    pastedContentState = pastedContentState.set('blockMap', blockMap) as ContentState
    const { contentState, selectionState } = this.getContentAndSelection()
    // remove selected range and split current content block
    const afterRemoveContentState = Modifier.removeRange(
      contentState,
      selectionState,
      'backward'
    )
    const afterRemoveSelectionState = afterRemoveContentState.getSelectionAfter()
    const afterSplitContentState = Modifier.splitBlock(afterRemoveContentState, afterRemoveSelectionState)
    const afterSplitSelectionState = afterSplitContentState.getSelectionBefore()
    // prepend a blank content block to the pasted block
    let afterPrependContentBlockArray = [new ContentBlock({
      key: genKey(),
      type: 'unstyled',
      text: '',
      characterList: List()
    })].concat(pastedContentState.getBlocksAsArray())
    let pastedBlockMap = BlockMapBuilder.createFromArray(afterPrependContentBlockArray)
    // insert the pasted content block
    const afterPasteContentState = Modifier.replaceWithFragment(afterSplitContentState, afterSplitSelectionState, pastedBlockMap)
    const editorStateAfterPaste = EditorState.push(this.state.editorState, afterPasteContentState, 'insert-fragment')
    this.onChange(editorStateAfterPaste)
  }

  handlePastedText = (text: string, html: string): DraftHandleValue => {
    const editorState = this.state.editorState;
    const { contentState, selectionState } = this.getContentAndSelection()
    const blockKey = selectionState.getAnchorKey()
    const block = contentState.getBlockForKey(blockKey)
    if (block.getType() === 'code-block') {
      return 'not-handled';
    }
    // TODO parsing the url
    if (text && isUrl(text.trim())) {
      let newContentState = Modifier.insertText(contentState, selectionState, text)
      let editorStateAfterPaste = EditorState.push(this.state.editorState, newContentState, 'insert-characters')
      this.onChange(editorStateAfterPaste)
      return 'handled'
    }
    // TODO html to block
    if (html) {
      this.handleHtml(html)
      return 'handled'
    }
    return 'not-handled'
  }

  onTab = (e: Event): DraftHandleValue => {
    const editorState = this.state.editorState;
    const { contentState, selectionState } = this.getContentAndSelection()
    // prevent default page jump
    e.preventDefault()
    let newContentState = Modifier.insertText(contentState, selectionState, '    ')
    let editorStateAfterPaste = EditorState.push(this.state.editorState, newContentState, 'insert-characters')
    this.onChange(editorStateAfterPaste)
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
          handleKeyCommand={cmd => this.handleKeyCommand(cmd)}
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
