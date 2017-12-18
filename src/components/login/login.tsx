import * as React from 'react'
import { Input } from '../controlled/input'
import { Button } from '../buttons/button'
import * as UserAction from '../../actions/session'
import { SocialAccounts } from 'app/components/login/socialAccounts';

import './login.less'

interface ILoginProps {
    dispatch
    closeModal?
}
export default class Login extends React.Component<ILoginProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            account: '',
            password: '',
            isActive: false
        }
    }
    toggleAccount = (e) => {
        this.setState({
            account: e.target.value
        })
    }
    togglePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    login = () => {
        let account = this.state.account
        let password = this.state.password
        this.props.dispatch(UserAction.login(account, password)).then(() => {
            this.props.closeModal && this.props.closeModal()
        })
    }
    render() {
        return (
            <div className="login-frame">
                <Input value={this.state.account} placeholder="请输入您的邮箱" onChange={this.toggleAccount} />
                <Input value={this.state.password} placeholder="请输入您的密码" onChange={this.togglePassword} />
                <Button onClick={this.login} isActive={this.state.isActive}>登录</Button>
                <SocialAccounts/>
            </div>
        )
    }
}