import * as React from "react";
import { connect } from "react-redux";
import { EditorState } from "draft-js";
import { show, hide } from "../actions/show";
import { Link } from "react-router-dom";
import * as classnames from 'classnames'

import "./styles/article.less";
import JiglooEditor from "../components/editor";
import { Serlizer } from "../components/editor/utils/serializer";
import * as ShowKey from '../constants/showKey'
import * as AricleAction from '../actions/article'

import { ItalicButton, BoldButton, UnderlineButton } from 'draft-js-buttons';
import { composeDecorators } from "draft-js-plugins-editor";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createResizeablePlugin from "draft-js-resizeable-plugin"
import createFocusPlugin from "draft-js-focus-plugin";
import createBlockDndPlugin from "draft-js-drag-n-drop-plugin";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createLinkPlugin from 'draft-js-anchor-plugin';

import createCodePlugin from "../components/editor/plugins/code-highlight/code-light.plugin";
import { createImagePlugin } from "../components/editor/plugins/image/index";
import createPageCardPlugin from "../components/editor/plugins/page-card/index"
import { createSideToolBarPlugin } from "../components/editor/plugins/side-tool-bar/index";
import createColorBlockPlugin from "../components/editor/plugins/focusColor/index"
import LazyLoad from 'react-lazyload'

import Catalogue from "../components/editor/plugins/catalogue/index"
import Background from '../components/controlled/background'

const linkPlugin = createLinkPlugin();
const linkifyPlugin = createLinkifyPlugin()
const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();
const blockDndPlugin = createBlockDndPlugin();
const resizeablePlugin = createResizeablePlugin()
const { AlignmentTool } = alignmentPlugin;

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
const pageCardPlugin = createPageCardPlugin({ decorator, readOnly: false });

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
    pageCardPlugin,
    linkifyPlugin,
    createCodePlugin({}),
];
class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }
    componentWillMount() {
        this.props.dispatch(AricleAction.getArticleById(this.props.match.params.articleId))
    }
    componentDidMount() {
        this.toggleShow()
    }
    onChange = (editorState: EditorState) => {
        this.setState({
            editorState: editorState
        })
    }
    toggleShow = () => {
        if (this.props.show.toJS().editor) {
            this.props.dispatch(hide(ShowKey.EDITOR))
        } else {
            this.props.dispatch(show(ShowKey.EDITOR))
        }
    }
    render() {
        let article = this.props.article.toJS()
        return (
            <div>
                <div style={{height:'100vh',width:'100vh'}}>
                <Background imageUrl={article.cover} isEditable={false}>
                    <h1>{article.title}</h1>
                </Background>
                </div>
                <div className={classnames({ "init": true, "init--moveLeft": this.props.show.toJS().catalogue })}>
                    <LazyLoad once height={200} offset={100}>
                        <JiglooEditor
                            readonly={!this.props.show.toJS().editor}
                            editorState={this.state.editorState}
                            plugins={plugins}
                            placeholder={this.props.show.toJS().editor ? "请输入正文..." : ""}
                            onChange={this.onChange}
                        >
                            <InlineToolbar />
                            <SideToolbar />
                            <AlignmentTool />
                        </JiglooEditor>
                    </LazyLoad>
                </div>
                <Catalogue
                    editorState={this.state.editorState}
                    show={this.props.show.toJS().catalogue}
                    dispatch={this.props.dispatch}
                />
            </div>
        );
    }
}
function mapStateToProps(state: any, props: any) {
    return state
}
export default connect(mapStateToProps)(App);