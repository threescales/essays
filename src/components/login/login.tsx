import * as React from 'react'
import { Input } from '../controlled/input'
import { Button } from '../buttons/button'
import * as UserAction from '../../actions/session'
export default class Login extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isActive: false
        }
    }
    toggleEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    togglePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    login = () => {
        let email = this.state.email
        let password = this.state.password
        this.props.dispatch(UserAction.login(email,password))
    }
    render() {
        return (
            <div>
                <Input value={this.state.email} placeholder="请输入您的邮箱" onChange={this.toggleEmail} />
                <Input value={this.state.password} placeholder="请输入您的密码" onChange={this.togglePassword} />
                <Button onClick={this.login} isActive={this.state.isActive}>登录</Button>
            </div>
        )
    }
}