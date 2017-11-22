import * as React from "react";
import { connect } from "react-redux";
import { EditorState } from "draft-js";
import { show } from "../actions/show";
import { Link } from "react-router-dom";
import "./styles/write.less";
import JiglooEditor from "../components/editor";
import { Serlizer } from "../components/editor/utils/serializer";

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
import createCataloguePlugin from "../components/editor/plugins/catalogue/index"
import createColorBlockPlugin from "../components/editor/plugins/focusColor/index"
import LazyLoad from 'react-lazyload'

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

const catalouePlugin = createCataloguePlugin();
const { Catalogue, onChange } = catalouePlugin;

const imagePlugin = createImagePlugin({ decorator });
const pageCardPlugin = createPageCardPlugin({ decorator, readOnly: false });

const plugins = [
    inlineToolbarPlugin,
    sideToolbarPlugin,
    linkPlugin,
    catalouePlugin,
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
            editorState: null
        }
    }
    componentDidMount() {
        this.props.dispatch(show("a"));
    }
    onChange = (editorState: EditorState) => {
        this.setState({
            editorState: editorState
        })
    }
    render() {
        return (

            <div className="init">
                <LazyLoad once height={200} offset={100}>
                    <JiglooEditor
                        readonly={false}
                        plugins={plugins}
                        placeholder=""
                        onChange={this.onChange}
                    >
                        <InlineToolbar />
                        <SideToolbar />
                        <AlignmentTool />
                        <Catalogue editorState={this.state.editorState} />
                    </JiglooEditor>
                </LazyLoad>
            </div>
        );
    }
}
function mapStateToProps(state: any, props: any) {
    return {
        show: state.show
    };
}
export default connect(mapStateToProps)(App);