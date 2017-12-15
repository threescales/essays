import * as React from 'react'
import { connect } from 'react-redux'
import { AppContainer } from './app'
import './styles/account.less';
import { LayoutLeft, LayoutRight, LayoutLR } from '../components/layout/layoutLR';
import { Button } from '../components/buttons/button'
import { bindGithub } from '../constants/path'
import { GITHUB, EMAIL } from '../constants/accountType'
import { Input, Textarea } from "../components/controlled/input"
import * as SessionActions from "../actions/session"
@AppContainer
class AccountContainer extends React.Component<any, any> {
    constructor(props) {
        super(props)
        let user = this.props.session.toJS().user
        this.state = {
            user: user,
            name: user.name,
            email: user.email,
            introduction: user.introduction
        }
    }
    changeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    changeIntroduction = (e) => {
        this.setState({
            introduction: e.target.value
        })
    }
    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    confirmChange = (key) => {
        let user = this.state.user
        user[key] = this.state[key]
        this.props.dispatch(SessionActions.updateUser(user))
    }
    sendEmail = () => {
        let user = this.state.user
        user.email = this.state.email
        this.props.dispatch(SessionActions.sendMail(user))
    }
    render() {
        const user = this.state.user

        let githubAccount = null;
        let emailAccount = null;
        for (let account of user.accounts) {
            if (account.type == GITHUB) {
                githubAccount = account
            } else if (account.type == EMAIL) {
                emailAccount = account
            }
        }
        return (
            <div>
                <div className="account-page">
                    <div>
                        <Box title="姓名">
                            <LayoutLR>
                                <LayoutLeft>
                                    <Input placeholder="请输入您的姓名" value={this.state.name} onChange={this.changeName} />
                                </LayoutLeft>
                                <LayoutRight>
                                    <Button onClick={() => { this.confirmChange("name") }}>姓名修改</Button>
                                </LayoutRight>
                            </LayoutLR>
                        </Box>
                        <Box title="邮箱">
                            <LayoutLR>
                                <LayoutLeft>
                                    {
                                        !!emailAccount ?
                                            <p>{this.state.email}</p>
                                            : <Input placeholder="请输入您的邮箱" value={this.state.email} onChange={this.changeEmail} />
                                    }
                                </LayoutLeft>
                                <LayoutRight>
                                    {!!emailAccount ? <span>已绑定</span> : <Button onClick={this.sendEmail}>发送</Button>}
                                </LayoutRight>
                            </LayoutLR>
                        </Box>
                        <Box title="简介">
                            <LayoutLR>
                                <LayoutLeft>
                                    <Textarea placeholder="请输入您的简介" value={this.state.introduction} onChange={this.changeIntroduction} />
                                </LayoutLeft>
                                <LayoutRight>
                                    <Button onClick={() => { this.confirmChange("introduction") }}>简介修改</Button>
                                </LayoutRight>
                            </LayoutLR>
                        </Box>
                        <Box title="Github">
                            <LayoutLR>
                                <LayoutLeft>
                                    <p>{githubAccount ? '已绑定' : '未绑定'}</p>
                                </LayoutLeft>
                                <LayoutRight>
                                    {
                                        !githubAccount ?
                                            <Button onClick={() => { window.location.href = bindGithub }}>绑定</Button>
                                            // : <Button onClick={()=>this.unbind(GITHUB)}>解绑</Button>
                                            : null
                                    }
                                </LayoutRight>
                            </LayoutLR>
                        </Box>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any, props: any) {
    return state
}
export default connect(mapStateToProps)(AccountContainer);

const Box = ({ children, title }) => {
    return <section className="setting-box">
        <h4>{title}</h4>
        {children}
    </section>
}