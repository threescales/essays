import * as React from "react";
import { connect } from "react-redux";
import { EditorState, convertFromRaw, EditorBlock, convertToRaw } from "draft-js";
import { show, hide } from "../actions/show";
import { Link } from "react-router-dom";
import * as classnames from 'classnames'
import { assign } from "lodash"
import "./styles/article.less";
import Editor from "../components/editor/editor";
import { Serlizer } from "../components/editor/utils/serializer";
import * as ShowKey from '../constants/showKey'



import Catalogue from "../components/catalogue/catalogue"
import ArticleHeader from '../components/articleHeader/articleHeader'
import * as ArticleAction from '../actions/article'
import Header from "../components/header/header"
import { Button } from '../components/buttons/button'
class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }
    componentWillMount() {
        this.props.dispatch(ArticleAction.getArticleById(this.props.match.params.articleId))
    }


    componentDidMount() {
        this.props.dispatch(ArticleAction.updateArticleCount(this.props.match.params.articleId, 'read'))
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
        let editorState = this.props.editorState
        let user = this.props.session.toJS().user
        let isOwner = user && article.userId === user._id
        return (
            <div>
                <ArticleHeader dispatch={this.props.dispatch} article={article} />
                <Header
                    dispatch={this.props.dispatch}
                    user={user}
                    showEditor={this.props.show.toJS().editor}
                    isOwner={isOwner}
                    article={article}
                />
                <div id="articleBody" className={classnames({ "init": true, "init--moveLeft": this.props.show.toJS().catalogue })}>
                    {
                        !!editorState ?
                            <Editor
                                editorState={this.props.editorState}
                                readOnly={!this.props.show.toJS().editor}
                                dispatch={this.props.dispatch}
                                articleId={this.props.match.params.articleId}
                            /> : null
                    }
                </div>
                {
                    !!editorState ? <Catalogue
                        editorState={this.props.editorState}
                        show={this.props.show.toJS().catalogue}
                        dispatch={this.props.dispatch}
                    /> : null
                }
            </div>
        );
    }
}
function mapStateToProps(state: any, props: any) {
    let editorState = null;
    if (!state.article.isEmpty()) {
        let contentState = JSON.parse(state.article.toJS().body)
        editorState = contentState ? EditorState.createWithContent(convertFromRaw(contentState)) : null
    }
    return assign(state, { editorState })
}
export default connect(mapStateToProps)(App);