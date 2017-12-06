import * as React from 'react'
import * as UserAction from '../../actions/session'
import { getCookie } from '../../utils/cookie'
import CreateNewArticle from '../modal/createNewArticle'
import { Button } from "../buttons/button"
import * as ShowAction from "../../actions/show"
import * as ArticleAction from "../../actions/article"
import { EDITOR } from "../../constants/showKey"
import { Editor } from 'draft-js';
import { OwnerAvatar } from '../../components/controlled/toggleableMenu'
import './header.less';

interface IHeaderProps {
    dispatch
    user
    isOwner?
    showEditor?
    article?
}
export default class Header extends React.Component<IHeaderProps, any> {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (!this.props.user) {
            let userId =
                this.props.dispatch(UserAction.getUserById())
        }
    }
    toggleEditor = () => {
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
        const user = this.props.user
        return (
            <header className="root-header">
                <div className="header-left">
                    {this.props.isOwner && <Button onClick={this.toggleEditor} onlyPC={true}>{this.props.showEditor ? '预览' : '编辑'}</Button>}
                    {
                        this.props.isOwner &&
                        this.props.article &&
                        <Button onClick={this.toogleArticlePublish} onlyPC={true}>{this.props.article.isPublish ? '下架' : '发布'}</Button>
                    }
                    {user && !this.props.isOwner && <CreateNewArticle dispatch={this.props.dispatch} user={this.props.user} />}
                </div>
                <div className="header-center">
                    <a href="/"><i className="iconfont icon-logo"></i></a>
                </div>
                <div className="header-right">
                    {
                        user &&
                        <OwnerAvatar src={user.avatar} >
                            <ul className="avatar-list">
                                <li>
                                    <a href="/myarticles">我写过的</a>
                                </li>
                            </ul>
                        </OwnerAvatar>
                    }
                </div>
            </header>
        )
    }
}