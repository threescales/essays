import * as React from 'react'
import { connect } from 'react-redux'
import { AppContainer } from './app'
import './styles/account.less';
import Header from '../components/header/header'
import { LayoutLeft, LayoutRight, LayoutLR } from '../components/layout/layoutLR';
import { Button } from '../components/buttons/button'
@AppContainer
class AccountContainer extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    render() {
        const user = this.props.session.toJS().user
        return (
            <div>
                <Header dispatch={this.props.dispatch} user={this.props.session.toJS().user} />
                <div className="account-page">
                    <div>
                    <Box title="姓名">
                            <LayoutLR>
                                <LayoutLeft>
                                    <p>{user.name}</p>
                                </LayoutLeft>
                                <LayoutRight>
                                    <Button onClick={() => { }}>姓名修改</Button>
                                </LayoutRight>
                            </LayoutLR>
                        </Box>
                        <Box title="邮箱">
                            <LayoutLR>
                                <LayoutLeft>
                                    <p>{user.email}</p>
                                </LayoutLeft>
                                <LayoutRight>
                                    <Button onClick={() => { }}>邮箱修改</Button>
                                </LayoutRight>
                            </LayoutLR>
                        </Box>
                        <Box title="简介">
                            <LayoutLR>
                                <LayoutLeft>
                                    <p>{user.name}</p>
                                </LayoutLeft>
                                <LayoutRight>
                                    <Button onClick={() => { }}>简介修改</Button>
                                </LayoutRight>
                            </LayoutLR>
                        </Box>
                        <Box title="Github">
                            <LayoutLR>
                                <LayoutLeft>
                                    <p>未绑定</p>
                                </LayoutLeft>
                                <LayoutRight>
                                    <Button onClick={() => { }}>绑定</Button>
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