import * as React from 'react'
import * as UserAction from '../../actions/session'
import { getCookie } from '../../utils/cookie'
import CreateNewArticle from '../modal/createNewArticle'
import { Button } from "../buttons/button"
import * as ShowAction from "../../actions/show"
import * as ArticleAction from "../../actions/article"
import { EDITOR } from "../../constants/showKey"
import { Editor } from 'draft-js';
import { OwnerAvatar } from '../controlled/toggleableMenu'
import { Popover } from '../popover/popover'
import { Link } from 'react-router-dom'
import UserOpera from '../userOpera/userOpera'
import './header.less';
import { requireLogin } from '../../utils/requireLogin'
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
        this.toggleEditor = this.toggleEditor.bind(this)
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
        const user = this.props.user
        return (
            <header className="root-header">
                <div className="header-left">
                    {
                        user &&
                        <OwnerAvatar src={user.avatar} >
                            <Popover>
                                <UserOpera user={user} dispatch={this.props.dispatch} />
                            </Popover>
                        </OwnerAvatar>
                    }
                </div>
                <div className="header-center animated wobble">
                    <Logo />
                </div>
                <div className="header-right">
                    {this.props.isOwner && <Button onClick={this.toggleEditor} onlyPC={true}>{this.props.showEditor ? '保存' : '编辑'}</Button>}
                    {
                        this.props.isOwner &&
                        this.props.article &&
                        user.isAdmin &&
                        <Button onClick={this.toogleArticlePublish} onlyPC={true}>{this.props.article.isPublish ? '下架' : '发布'}</Button>
                    }
                    <CreateNewArticle dispatch={this.props.dispatch} user={this.props.user} />
                </div>
            </header>
        )
    }
}

const Logo = ({ className = "" }) => {
    return <Link to="/" className={className}><i className="iconfont icon-logo"></i></Link>

}