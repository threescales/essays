import * as React from "react";
import {
  EditorState,
  convertFromRaw,
  EditorBlock,
  convertToRaw
} from "draft-js";

import { ItalicButton, BoldButton, UnderlineButton } from "draft-js-buttons";
import { composeDecorators } from "draft-js-plugins-editor";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin";
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

import JiglooEditor from "./index";
import * as AricleAction from "../../actions/article";
import { EDITOR_TYPE } from "../../constants/editorType";

const linkPlugin = createLinkPlugin();
const linkifyPlugin = createLinkifyPlugin();
const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();
const blockDndPlugin = createBlockDndPlugin();
const resizeablePlugin = createResizeablePlugin();
const { AlignmentTool } = alignmentPlugin;
const blockBreakoutPlugin = createBlockBreakoutPlugin();
const autolistPlugin = createAutoListPlugin();

const decorator = composeDecorators(
  alignmentPlugin.decorator,
  resizeablePlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);

const colorBlockPlugin = createColorBlockPlugin({ decorator });

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [BoldButton, ItalicButton, UnderlineButton, linkPlugin.LinkButton]
});
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolBarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const imagePlugin = createImagePlugin({ decorator });

const plugins = [
  inlineToolbarPlugin,
  sideToolbarPlugin,
  linkPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
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
  readOnly;
  setEditorState?;
}

export default class CommentEditor extends React.Component<IEditorProps, any> {
  private autoSavePlugin: AutoSavePlugin;

  componentWillMount() {
    this.autoSavePlugin = createAutoSavePlugin({
      saveAction: this.save,
      debounceTime: 1
    });
  }

  getPluigins = () => {
    const pageCardPlugin = createPageCardPlugin({
      decorator,
      readOnly: this.props.readOnly
    });
    const others = [this.autoSavePlugin, pageCardPlugin];
    return plugins.concat(others);
  };

  save = (state: EditorState) => {
    this.props.setEditorState(state);
  };
  render() {
    return (
      <div>
        <JiglooEditor
          readonly={this.props.readOnly}
          editorState={this.props.editorState}
          plugins={this.getPluigins()}
          placeholder={!this.props.readOnly ? "请输入您的评论..." : ""}
          type={EDITOR_TYPE.comment}
        />
      </div>
    );
  }
}
