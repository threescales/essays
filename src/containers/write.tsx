import * as React from "react";
import { connect } from "react-redux";
import { EditorState } from "draft-js";
import { show } from "../actions/show";
import { Link } from "react-router-dom";
import "./styles/write.less";
import JiglooEditor from "../components/editor";
import { Serlizer } from "../components/editor/utils/serializer";
import { createImagePlugin } from "../components/editor/plugins/image/index";
import createAlignmentPlugin from "draft-js-alignment-plugin";
import createFocusPlugin from "draft-js-focus-plugin";
import linkify from "draft-js-linkify-plugin";
import createCodePlugin from "app/components/editor/plugins/code-highlight/code-light.plugin";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import { createSideToolBarPlugin } from "../components/editor/plugins/side-tool-bar/index";
import createCataloguePlugin from "../components/editor/plugins/catalogue/index"
import { composeDecorators } from "draft-js-plugins-editor";

const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();

const decorator = composeDecorators(
    alignmentPlugin.decorator,
    focusPlugin.decorator,
);


const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const sideToolbarPlugin = createSideToolBarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const catalouePlugin = createCataloguePlugin();
const { Catalogue, onChange } = catalouePlugin;

const imagePlugin = createImagePlugin({ decorator });
const plugins = [
    inlineToolbarPlugin,
    sideToolbarPlugin,
    catalouePlugin,
    focusPlugin,
    alignmentPlugin,
    imagePlugin,
    linkify(),
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
                <JiglooEditor
                    readonly={false}
                    plugins={plugins}
                    placeholder=""
                    onChange={this.onChange}
                >
                    <InlineToolbar></InlineToolbar>
                    <SideToolbar></SideToolbar>
                    <Catalogue editorState={this.state.editorState}></Catalogue>
                </JiglooEditor>
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