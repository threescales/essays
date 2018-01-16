import * as React from "react";
import {
  EditorState,
  convertFromRaw,
  EditorBlock,
  convertToRaw
} from "draft-js";

import { ItalicButton, BoldButton, UnderlineButton } from "draft-js-buttons";
import { composeDecorators } from "draft-js-plugins-editor";
import createFocusPlugin from "draft-js-focus-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import createBlockBreakoutPlugin from "draft-js-block-breakout-plugin";
import createAutoListPlugin from "draft-js-autolist-plugin";

import createCodePlugin from "./plugins/code-highlight/code-light.plugin";
import { createImagePlugin } from "./plugins/image/index";
import createPageCardPlugin from "./plugins/page-card/index";
import { createSideToolBarPlugin } from "./plugins/side-tool-bar/index";
import createColorBlockPlugin from "./plugins/focusColor/index";
import {
  createAutoSavePlugin,
  AutoSavePlugin
} from "./plugins/autoSave/autosave.plugin";
import createReaderInlinePlugin from "./plugins/comment/index";
import LazyLoad from "react-lazyload";

import { EDITOR_TYPE } from "../../constants/editorType";
import JiglooEditor from "./index";
import * as AricleAction from "../../actions/article";

const linkPlugin = createLinkPlugin();
const linkifyPlugin = createLinkifyPlugin();
const focusPlugin = createFocusPlugin();
const blockDndPlugin = createBlockDndPlugin();
const blockBreakoutPlugin = createBlockBreakoutPlugin();
const autolistPlugin = createAutoListPlugin();
const decorator = composeDecorators(
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const colorBlockPlugin = createColorBlockPlugin({ decorator });

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [BoldButton, ItalicButton, UnderlineButton, linkPlugin.LinkButton]
});
const { InlineToolbar } = inlineToolbarPlugin;

const readerInlinePlugin = createReaderInlinePlugin({});
const { ReaderInlineToolbar } = readerInlinePlugin;

const sideToolbarPlugin = createSideToolBarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const imagePlugin = createImagePlugin({ decorator });

const plugins = [
  inlineToolbarPlugin,
  sideToolbarPlugin,
  readerInlinePlugin,
  linkPlugin,
  blockDndPlugin,
  focusPlugin,
  colorBlockPlugin,
  imagePlugin,
  linkifyPlugin,
  blockBreakoutPlugin,
  autolistPlugin,
  createCodePlugin({})
];

interface IEditorProps {
  dispatch;
  editorState;
  articleId;
  readOnly;
}

export default class Editor extends React.Component<IEditorProps, any> {
  private autoSavePlugin: AutoSavePlugin;

  componentWillMount() {
    this.autoSavePlugin = createAutoSavePlugin({
      saveAction: this.save,
      debounceTime: 850
    });
  }

  save = (state: EditorState) => {
    const contentState = JSON.stringify(
      convertToRaw(state.getCurrentContent())
    );
    if (contentState.indexOf('"valid":false') > -1) {
      return;
    }
    if (!this.props.readOnly) {
      this.props.dispatch(
        AricleAction.saveArticleBody(this.props.articleId, contentState)
      );
    }
  };

  getPluigins = () => {
    const pageCardPlugin = createPageCardPlugin({
      decorator,
      readOnly: this.props.readOnly
    });
    const others = [this.autoSavePlugin, pageCardPlugin];
    return plugins.concat(others);
  };

  render() {
    return (
      <div>
        <JiglooEditor
          readonly={this.props.readOnly}
          editorState={this.props.editorState}
          plugins={this.getPluigins()}
          placeholder={!this.props.readOnly ? "请输入正文..." : ""}
          type={EDITOR_TYPE.article}
        >
          {!this.props.readOnly && [
            <InlineToolbar key="1" />,
            <SideToolbar key="2" />
          ]}
          {this.props.readOnly && (
            <ReaderInlineToolbar articleId={this.props.articleId} />
          )}
        </JiglooEditor>
      </div>
    );
  }
}
