import * as React from "react";
import { connect } from "react-redux";
import { EditorState, convertFromRaw, EditorBlock, convertToRaw } from "draft-js";
import { show, hide, initShow } from "../actions/show";
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
import * as UserAction from '../actions/user'
import Header from "../components/header/header"
import { Button } from '../components/buttons/button'
import { initPosition } from '../utils/position'
import {AppContainer} from './app'

@AppContainer
class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }
    componentWillMount() {
        this.props.dispatch(ArticleAction.getArticleById(this.props.match.params.articleId)).then((res)=> {
            if(res&&res.data) {
                this.props.dispatch(UserAction.getUserInfo(res.data.ownerId))                
            }
        })
    }


    componentDidMount() {
        this.props.dispatch(ArticleAction.updateArticleCount(this.props.match.params.articleId, 'read'))
        // initPosition()        
    }

    toggleShow = () => {
        if (this.props.show.toJS().editor) {
            this.props.dispatch(hide(ShowKey.EDITOR))
        } else {
            this.props.dispatch(show(ShowKey.EDITOR))
        }
    }
    componentWillUnmount() {
        this.props.dispatch(initShow())
        this.props.dispatch(ArticleAction.initArticle())
        initPosition()
    }
    render() {
        let article = this.props.article.toJS()
        let editorState = this.props.editorState
        let currentUser = this.props.session.toJS().user
        let isOwner = currentUser && article.ownerId === currentUser.id
        let owner = this.props.user.toJS()
        return (
            <div className="animated fadeInLeft">
                <ArticleHeader dispatch={this.props.dispatch} article={article} user={owner} isOwner={isOwner} showEditor={this.props.show.toJS().editor}/>
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
        let contentState = state.article.toJS().body
        editorState = contentState ? EditorState.createWithContent(convertFromRaw(contentState)) : null
    }
    return assign(state, { editorState })
}
export default connect(mapStateToProps)(App);