import * as React from 'react'
import { Input } from '../controlled/input'
import { Button } from '../buttons/button'
import * as UserAction from '../../actions/session'
import toastr from 'utils/toastr'
import './login.less'
import { SocialAccounts } from 'app/components/login/socialAccounts';

interface ISignupProps {
    dispatch
    closeModal?
}
export default class Login extends React.Component<ISignupProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
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
    toggleConfirmPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value
        })
    }
    toggleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    signup = () => {
        let name = this.state.name
        let email = this.state.email
        let password = this.state.password
        let confirmPassword = this.state.confirmPassword
        if(!name||!password||!email) {
            toastr.error('您还有信息没有填哦');   
            return         
        }

        if(password!=confirmPassword) {
            toastr.error('两次输入的密码不一样');
            return
        }

        if(name.length>7) {
            toastr.error('昵称长度最多为7位哦')
            return
        }
        if(password.length<6) {
            toastr.error('密码长度不能少于6位哦')
            return
        }
        this.setState({
            isActive: true
        }, () => {
            this.props.dispatch(UserAction.signup(email, password,name)).then(() => {
                this.setState({
                    isActive: false
                })
                this.props.closeModal && this.props.closeModal()
            })
        })

    }
    render() {
        return (
            <div className="login-frame">
                <Input value={this.state.name} placeholder="请输入您的昵称" onChange={this.toggleName} />
                <Input value={this.state.account} placeholder="请输入您的邮箱" onChange={this.toggleEmail} />
                <Input value={this.state.password} type="password" placeholder="请输入您的密码" onChange={this.togglePassword} />
                <Input value={this.state.confirmPassword} type="password" placeholder="请再次输入您的密码" onChange={this.toggleConfirmPassword} />
                <Button onClick={this.signup} isActive={this.state.isActive}>注册</Button>
                <SocialAccounts/>
            </div>
        )
    }
}