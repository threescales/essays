import * as React from 'react'
import Background from '../controlled/background'
import './articleHeader.less'
const jump = require("jump.js")
import UserCard from '../user/userCard'
import { Button } from "../buttons/button"
import CreateNewArticle from '../modal/createNewArticle'
import * as ArticleAction from "../../actions/article"
import * as ShowAction from "../../actions/show"
import { requireLogin } from '../../utils/requireLogin'
import { EDITOR } from "../../constants/showKey"
import { Logo } from '../logo/logo'

interface IBookHeaderProps {
    article
    dispatch
    user
    isOwner
    showEditor
}

export default class BookHeader extends React.Component<IBookHeaderProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
        this.toggleEditor = this.toggleEditor.bind(this)

    }
    moveDown = () => {
        jump.default('#articleBody'),
            {
                duration: 300,
                offset: 0,
                callback: undefined,
                a11y: false
            }
    }

    @requireLogin
    toggleEditor() {
        if (this.props.showEditor) {
            this.props.dispatch(ShowAction.hide(EDITOR))
        } else {
            this.props.dispatch(ShowAction.show(EDITOR))
        }
    }
    toogleArticlePublish = () => {
        this.props.dispatch(ArticleAction.toggleArticlePublish(this.props.article._id, !this.props.article.isPublish))
    }
    render() {
        let article = this.props.article
        let user = this.props.user
        return (
            [
                <div className="article-header" key="header">
                    <Logo className="return-index" />
                    <Background
                        imageUrl={article.cover}
                        isEditable={false}
                        style={{ opacity: 0.6, position: 'absolute' }}
                        width={this.state.width}
                        height={this.state.height}
                    />
                    <div className="">
                        <UserCard user={this.props.user} />
                    </div>
                    <div className="content">
                        <h1>{article.title}</h1>
                    </div>
                    <a className="move-down" onClick={this.moveDown}>
                        <i className="iconfont icon-move-down"></i>
                    </a>
                </div>,
                <div className="article-opera-header" key="opera">
                    <div className="header-left">

                    </div>
                    {
                        this.props.isOwner &&
                        <div className="header-right">
                            <Button onClick={this.toggleEditor} onlyPC={true}>{this.props.showEditor ? '保存' : '编辑'}</Button>
                            <Button onClick={this.toogleArticlePublish} onlyPC={true}>{this.props.article.isPublish ? '下架' : '发布'}</Button>
                        </div>
                    }
                </div>
            ]
        )
    }
}