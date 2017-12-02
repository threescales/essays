import * as React from 'react'
import * as UserAction from '../../actions/session'
import { getCookie } from '../../utils/cookie'
import CreateNewArticle from '../modal/createNewArticle'
import { Button } from "../buttons/button"
import * as ShowAction from "../../actions/show"
import { EDITOR } from "../../constants/showKey"
import { Editor } from 'draft-js';
import './header.less';

interface IHeaderProps {
    dispatch
    user
    isOwner?
    showEditor?
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
    render() {
        const user = this.props.user
        return (
            <header className="root-header">
                <div className="header-left">
                    {this.props.isOwner && <Button onClick={this.toggleEditor} onlyPC={true}>{this.props.showEditor ? '预览' : '编辑'}</Button>}
                    {user && !this.props.isOwner && <CreateNewArticle dispatch={this.props.dispatch} user={this.props.user} />}
                </div>
                <div className="header-center">
                    <a href="/">{`${user.name}的随笔`}</a>
                </div>
                <div className="header-right">
                    {user && <img src={user.avatar} />}
                </div>
            </header>
        )
    }
}