import * as React from 'react'
import { EditorState, convertFromRaw, EditorBlock, convertToRaw } from "draft-js";

import { ItalicButton, BoldButton, UnderlineButton } from 'draft-js-buttons';
import { composeDecorators } from "draft-js-plugins-editor";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin"
import createFocusPlugin from "draft-js-focus-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createLinkPlugin from 'draft-js-anchor-plugin';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createAutoListPlugin from 'draft-js-autolist-plugin'

import createCodePlugin from "./plugins/code-highlight/code-light.plugin";
import { createImagePlugin } from "./plugins/image/index";
import createPageCardPlugin from "./plugins/page-card/index"
import { createSideToolBarPlugin } from "./plugins/side-tool-bar/index";
import createColorBlockPlugin from "./plugins/focusColor/index"
import { createAutoSavePlugin, AutoSavePlugin } from './plugins/autoSave/autosave.plugin'
import LazyLoad from 'react-lazyload'

import JiglooEditor from './index'
import * as AricleAction from '../../actions/article'

const linkPlugin = createLinkPlugin();
const linkifyPlugin = createLinkifyPlugin()
const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();
const blockDndPlugin = createBlockDndPlugin();
const resizeablePlugin = createResizeablePlugin()
const { AlignmentTool } = alignmentPlugin;
const blockBreakoutPlugin = createBlockBreakoutPlugin()
const autolistPlugin = createAutoListPlugin()
const decorator = composeDecorators(
    alignmentPlugin.decorator,
    resizeablePlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
);

const colorBlockPlugin = createColorBlockPlugin({ decorator })



const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        linkPlugin.LinkButton
    ]
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
    createCodePlugin({}),
];

interface IEditorProps {
    dispatch
    editorState
    articleId
    readOnly
}

export default class Editor extends React.Component<IEditorProps, any> {
    private autoSavePlugin: AutoSavePlugin

    componentWillMount() {
        this.autoSavePlugin = createAutoSavePlugin({ saveAction: this.save, debounceTime: 850 })
    }
    // shouldComponentUpdate(nextProps,nextState) {
    //     if(nextProps.readOnly!=this.props.readOnly) {
    //         return true
    //     }
    //     if(nextState.editorState!=this.state.editorState) {
    //         return true
    //     }
    //     return false;
    // }
    save = (state: EditorState) => {
        this.props.dispatch(
            AricleAction.saveArticleBody(
                this.props.articleId, convertToRaw(state.getCurrentContent())))
    }

    getPluigins = () => {
        const pageCardPlugin = createPageCardPlugin({ decorator, readOnly: this.props.readOnly });
        const others = [this.autoSavePlugin, pageCardPlugin]
        return plugins.concat(others)
    }

    render() {
        return (
            <div>
                <LazyLoad once height={200} offset={100}>
                    <JiglooEditor
                        readonly={this.props.readOnly}
                        editorState={this.props.editorState}
                        plugins={this.getPluigins()}
                        placeholder={!this.props.readOnly ? "请输入正文..." : ""}
                    >
                        {
                            !this.props.readOnly && [
                                <InlineToolbar key="1"/>,
                                <SideToolbar key="2" />,
                                <AlignmentTool key="3" />
                            ]
                        }
                    </JiglooEditor>
                </LazyLoad>
            </div>
        )
    }
}