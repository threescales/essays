import * as React from "react";
import { connect } from "react-redux";
import { EditorState } from "draft-js";
import { login } from "../actions/session";
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

const imagePlugin = createImagePlugin({ decorator });
const plugins = [
    inlineToolbarPlugin,
    sideToolbarPlugin,
    focusPlugin,
    alignmentPlugin,
    imagePlugin,
    linkify(),
    createCodePlugin({}),
];
class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(login("1111"));
    }
    render() {
        return (
            // tslint:disable-next-line:no-unused-expression
            [<a href="/welcome">跳转到欢迎页</a>,
            <div className="init">
                <JiglooEditor
                    readonly={false}
                    plugins={plugins}
                    placeholder=""
                >
                    <InlineToolbar></InlineToolbar>
                    <SideToolbar></SideToolbar>
                </JiglooEditor>
            </div>
            ]
        );
    }
}
function mapStateToProps(state: any, props: any) {
    return {
        token: state.session
    };
}
export default connect(mapStateToProps)(App);