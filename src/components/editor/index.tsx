import React = require("react");
import {
  default as Editor,
  createEditorStateWithText
} from "draft-js-plugins-editor";
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
  CharacterMetadata,
  Entity
} from "draft-js";
const isSoftNewlineEvent = require("draft-js/lib/isSoftNewlineEvent");

import { convertFromHTML as customConvertFromHtml } from "draft-convert";

import { DraftHandleValue } from "./interface.editor";
import { Serlizer } from "./utils/serializer";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import "draft-js-image-plugin/lib/plugin.css";
import "draft-js-alignment-plugin/lib/plugin.css";
import { Block } from "./utils/constants";
import { is, List, Repeat } from "immutable";
import { isUrl, getEntityTypeByUrl } from "../../utils/url";
import {
  focusSelectionAfter,
  selectBlock,
  removeBlockFromBlockMap
} from "./utils/operaBlock";
import { types } from "../../constants/entityType";
import { EDITOR_TYPE } from "../../constants/editorType";
import * as classnames from "classnames";
import "./draft.less";
import "./style.less";
interface EditorProps {
  plugins?: any[];
  decorators?: any[];
  editorState?: EditorState;
  content?: RawDraftContentState;
  placeholder?: string;
  onChange?: (s: EditorState) => any;
  readonly?: boolean;
  autoFocus?: boolean;
  type: EDITOR_TYPE;
}
import { getAjax } from "../../utils/ajax";
import * as Paths from "../../constants/path";
import { QINIU_CDN } from "app/constants/commonTypes";
export default class JiglooEditor extends React.Component<EditorProps, any> {
  public static placeholder = " ";
  public editor;
  public serializer;
  constructor(props: EditorProps) {
    super(props);
    this.serializer = Serlizer.serialize;
    this.state = {
      editorState: this.props.editorState
    };
  }
  /**
   * A bug was here .
   * If call the method(focus) ,decorators will not work
   */
  componentWillMount() {
    // this.focus()
    if (this.props.editorState) {
      this.setState({ editorState: this.props.editorState });
    } else if (this.props.content) {
      const editorState = EditorState.push(
        this.state.editorState,
        Serlizer.deserialize(this.props.content),
        "change-block-data"
      );
      this.setState({ editorState });
    }
  }
  // componentDidMount() {
  //   if (!this.props.readonly) {
  //     this.focus()
  //   }
  // }
  onChange = editorState => {
    this.setState({ editorState });

    if (this.props.onChange) {
      this.props.onChange(editorState);
    }
  };
  getEditorState = (): EditorState => {
    return this.state.editorState;
  };
  getContentAndSelection = () => {
    let editorState = this.getEditorState();
    let contentState = editorState.getCurrentContent();
    let selectionState = editorState.getSelection();
    return {
      contentState,
      selectionState
    };
  };
  shouldComponentUpdate(nextProps: EditorProps, nextState) {
    if (
      nextState.editorState &&
      !is(nextState.editorState, this.state.editorState)
    ) {
      return true;
    }

    if (nextProps.readonly !== this.props.readonly) {
      return true;
    }

    return false;
  }

  focus = () => {
    this.editor.getEditorRef().focus();
  };

  hasFocus = () => {
    return this.state.editorState.getSelection().getHasFocus();
  };

  private blockStyleFn = (block: ContentBlock) => {
    const type = block.getType();
    if (type === "unstyled") {
      return "paragraph";
    }

    if (type === "header-one" || type === "header-two") {
      return "editor-title serif";
    }

    return null;
  };

  //TODO upload image to qiniu
  uploadImg = async (block, entity, entityKey) => {
    let entityData: any = entity.getData();
    let imageUrl = entityData.src;
    //TODO 若七牛不能解析图片url则移除当前图片
    let result: any = await getAjax(Paths.getQiniuImageUrlByImgUrl(imageUrl));
    let data = result.data;
    let url = `${QINIU_CDN}/${data.key}`;
    console.log(data);
    entityData.height = data.imageInfo.height;
    entityData.width = data.imageInfo.width;
    entityData.valid = true;
    entityData.src = url;
    Entity.replaceData(entityKey, entityData);
    var editorState = this.getEditorState();
    let currentContent: any = editorState.getCurrentContent();
    let newContentState = currentContent.replaceEntityData(
      entityKey,
      entityData
    );
    const newES = EditorState.push(
      editorState,
      newContentState,
      "apply-entity"
    );
    this.onChange(newES);
  };

  //将img标签解析成image block映射算法
  getConvertOptions = () => {
    var { contentState } = this.getContentAndSelection();
    return {
      htmlToEntity: (nodeName, node: any) => {
        if (nodeName == "img") {
          //TODO image url to qiniu image url
          let entityKey = contentState
            .createEntity("image", "MUTABLE", {
              valid: false,
              description: "",
              src: node.src
            })
            .getLastCreatedEntityKey();
          node.textContent = node.src;
          return entityKey;
        } else if (nodeName === "br") {
          // return null;
        } else if (nodeName === "a") {
          // return contentState.createEntity(
          //   "image",
          //   'IMMUTABLE',
          //   { url: node.href }
          // ).getLastCreatedEntityKey()
        }
      },
      htmlToBlock: (nodeName, node) => {
        if (nodeName === "img") {
          return {
            type: "atomic",
            data: {}
          };
        } else if (nodeName === "h1") {
          return {
            type: Block.H1,
            data: {}
          };
        } else if (nodeName === "h2") {
          return {
            type: Block.H2,
            data: {}
          };
        } else if (nodeName === "h3") {
          return {
            type: Block.H3,
            data: {}
          };
        } else if (nodeName === "h4") {
          return {
            type: Block.H3,
            data: {}
          };
        } else if (nodeName === "h5") {
          return {
            type: Block.H3,
            data: {}
          };
        } else if (nodeName === "h6") {
          return {
            type: Block.H3,
            data: {}
          };
        } else if (nodeName === "blockquote") {
          return {
            type: Block.BLOCKQUOTE,
            data: {}
          };
        } else if (nodeName === "code") {
          return {
            type: Block.CODE,
            data: {}
          };
        }
      }
    };
  };
  handleKeyCommand = command => {
    switch (command) {
      case "backspace":
        return this.handleBackspace();
      default:
        return "not-handled";
    }
  };

  handleBackspace = () => {
    const editorState = this.getEditorState();
    const { contentState, selectionState } = this.getContentAndSelection();
    const block = contentState.getBlockForKey(selectionState.getAnchorKey());
    const blockBefore = contentState.getBlockBefore(block.getKey());
    if (block.getType() === "atomic") {
      var removeEditor = removeBlockFromBlockMap(editorState, block.getKey());
      this.onChange(removeEditor);
      return "handled";
    } else if (
      contentState.getLastBlock().getKey() == block.getKey() &&
      blockBefore &&
      blockBefore.getType() == "atomic" &&
      selectionState.getFocusOffset() === 0
    ) {
      let newEditorState = selectBlock(
        editorState,
        blockBefore.getKey(),
        blockBefore.getLength(),
        blockBefore.getLength()
      );
      this.onChange(newEditorState);
      return "handled";
    }
    return "not-handled";
  };

  /**
   * 将粘贴的html修改为block
   * @param html
   */
  handleHtml = html => {
    let pastedContentState = customConvertFromHtml(this.getConvertOptions())(
      html
    );
    let blockMap = pastedContentState.getBlockMap();
    pastedContentState = pastedContentState.set(
      "blockMap",
      blockMap
    ) as ContentState;
    const { contentState, selectionState } = this.getContentAndSelection();
    // remove selected range and split current content block
    const afterRemoveContentState = Modifier.removeRange(
      contentState,
      selectionState,
      "backward"
    );
    const afterRemoveSelectionState = afterRemoveContentState.getSelectionAfter();
    const afterSplitContentState = Modifier.splitBlock(
      afterRemoveContentState,
      afterRemoveSelectionState
    );
    const afterSplitSelectionState = afterSplitContentState.getSelectionBefore();
    // prepend a blank content block to the pasted block
    let afterPrependContentBlockArray = [
      new ContentBlock({
        key: genKey(),
        type: "unstyled",
        text: "",
        characterList: List()
      })
    ].concat(pastedContentState.getBlocksAsArray());
    let pastedBlockMap = BlockMapBuilder.createFromArray(
      afterPrependContentBlockArray
    );
    // insert the pasted content block
    const afterPasteContentState = Modifier.replaceWithFragment(
      afterSplitContentState,
      afterSplitSelectionState,
      pastedBlockMap
    );
    const editorStateAfterPaste = EditorState.push(
      this.state.editorState,
      afterPasteContentState,
      "insert-fragment"
    );
    this.onChange(editorStateAfterPaste);
    let currentContent = editorStateAfterPaste.getCurrentContent();
    currentContent.getBlocksAsArray().forEach(block => {
      let entityKey = block.getEntityAt(0);
      if (entityKey) {
        let entity = currentContent.getEntity(entityKey);
        if (block.getType() == "atomic") {
          this.uploadImg(block, entity, entityKey);
        }
      }
    });
  };

  handlePastedText = (text: string, html: string): DraftHandleValue => {
    const editorState = this.state.editorState;
    const { contentState, selectionState } = this.getContentAndSelection();
    const blockKey = selectionState.getAnchorKey();
    const block = contentState.getBlockForKey(blockKey);
    if (block.getType() === "code-block") {
      return "not-handled";
    }
    // TODO parsing the url
    if (text && isUrl(text.trim())) {
      let newContentState = Modifier.insertText(
        contentState,
        selectionState,
        text
      );
      let editorStateAfterPaste = EditorState.push(
        this.state.editorState,
        newContentState,
        "insert-characters"
      );
      this.onChange(editorStateAfterPaste);
      return "handled";
    }
    // TODO html to block
    if (html) {
      this.handleHtml(html);
      return "handled";
    }
    return "not-handled";
  };

  onTab = (e: Event): DraftHandleValue => {
    const editorState = this.state.editorState;
    const { contentState, selectionState } = this.getContentAndSelection();
    // prevent default page jump
    e.preventDefault();
    let newContentState = Modifier.insertText(
      contentState,
      selectionState,
      "    "
    );
    let editorStateAfterPaste = EditorState.push(
      this.state.editorState,
      newContentState,
      "insert-characters"
    );
    this.onChange(editorStateAfterPaste);
    return "handled";
  };

  render() {
    const placeholder = this.props.placeholder || JiglooEditor.placeholder;
    return (
      <div
        className={classnames({
          "jigloo-editor": true,
          "read-only": this.props.readonly
        })}
      >
        <Editor
          ref={e => (this.editor = e)}
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={this.props.plugins || []}
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
