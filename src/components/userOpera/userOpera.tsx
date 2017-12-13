import * as React from 'react'
import { Link } from 'react-router-dom'
import './userOpera.less';
import * as SessionAction from '../../actions/session'
interface IUserOperaProps {
    user
    dispatch
}
export default class UserOpera extends React.Component<IUserOperaProps, any> {
    constructor(props) {
        super(props)
    }

    signOut = () => {
        this.props.dispatch(SessionAction.loginOut())
    }

    render() {
        return (
            <ul className="user-opera-list">
                <li>
                    <Link to="/myarticles">我写过的</Link>
                </li>
                <li>
                    <a onClick={this.signOut}>退出登录</a>
                </li>
            </ul>
        )
    }
}