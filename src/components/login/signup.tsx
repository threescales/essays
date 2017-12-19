import * as React from 'react'
import { ValidateInput } from '../controlled/input'
import { Button } from '../buttons/button'
import * as UserAction from '../../actions/session'
import toastr from 'utils/toastr'
import './login.less'
import { SocialAccounts } from 'app/components/login/socialAccounts';
import * as ValidateUtils from 'utils/validate'
import { loginGithub } from '../../constants/path'
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
    checkPassword = (confirmPasswor) => {
        if (confirmPasswor != this.state.password) {
            return true
        }
        return false
    }
    signup = () => {
        let name = this.state.name
        let email = this.state.email
        let password = this.state.password
        let confirmPassword = this.state.confirmPassword

        if (window.document.getElementsByClassName("validate-message").length > 0) {
            return
        }

        if (!name || !password || !email || !confirmPassword) {
            toastr.error('您还有信息没有填哦~');
            return
        }

        this.setState({
            isActive: true
        }, () => {
            this.props.dispatch(UserAction.signup(email, password, name)).then(() => {
                this.setState({
                    isActive: false
                })
                this.props.closeModal && this.props.closeModal()
            })
        })

    }
    signupByGithub = () => {
        window.location.href = loginGithub
    }
    render() {
        return (
            <div className="login-frame">
                {/* <ValidateInput
                    value={this.state.name}
                    placeholder="请输入您的昵称"
                    onChange={this.toggleName}
                    validations={
                        [
                            { message: '昵称不能为空哦~', verify: ValidateUtils.isEmpty },
                            { message: '昵称不能超过20个字符', verify: ValidateUtils.checkNameLength },
                            { message: '昵称不能包含特殊字符哦~', verify: ValidateUtils.checkQuote },
                        ]
                    }
                />
                <ValidateInput
                    value={this.state.email}
                    placeholder="请输入您的邮箱"
                    onChange={this.toggleEmail}
                    validations={
                        [
                            { message: '邮箱不能为空~', verify: ValidateUtils.isEmpty },
                            { message: '请输入正确格式的邮箱~', verify: ValidateUtils.checkIsNotEmail }
                        ]
                    }
                />
                <ValidateInput
                    value={this.state.password}
                    type="password"
                    placeholder="请输入您的密码"
                    onChange={this.togglePassword}
                    validations={
                        [
                            { message: '密码不能为空哦~', verify: ValidateUtils.isEmpty },
                            { message: '请输入6~20位密码', verify: ValidateUtils.checkPasswordLength }
                        ]
                    }
                />
                <ValidateInput
                    value={this.state.confirmPassword}
                    type="password"
                    placeholder="请再次输入您的密码"
                    onChange={this.toggleConfirmPassword}
                    validations={
                        [
                            { message: '确认密码不能为空哦~', verify: ValidateUtils.isEmpty },
                            { message: '两次密码不一致', verify: this.checkPassword }
                        ]
                    }
                />
                <Button onClick={this.signup} isActive={this.state.isActive}>注册</Button> */}
                <Button onClick={this.signupByGithub} ><i className="iconfont icon-github" style={{marginRight:'20px'}}></i>Signup by gitHub</Button>
            </div>
        )
    }
}