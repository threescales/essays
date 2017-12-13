import * as React from 'react';
import * as UserAction from '../actions/session'
import * as ShowAction from '../actions/show'
import { LOGIN_MODAL } from '../constants/showKey'
import LoginModal from '../components/modal/loginModal'

export const AppContainer = (Container: any): any =>
    class CommonContainer extends React.Component<any, any> {
        constructor(props) {
            super(props)
        }
        componentWillMount() {
            if(!this.props.session.toJS().user) {
                this.props.dispatch(UserAction.getUserById())    
            }
            // this.props.dispatch(ShowAction.show(LOGIN_MODAL))
        }
        shouldLogin() {
            return window.location.href.indexOf("myarticles") > 0 || window.location.href.indexOf("account") > 0
        }
        render() {
            let show = true
            if (this.shouldLogin()) {
                show = false
                if (this.props.session.toJS().user) {
                    show = true
                }
            }
            return (
                <div>
                    {show && <Container {...this.props} />}
                    <LoginModal show={this.props.show.toJS()[LOGIN_MODAL]} dispatch={this.props.dispatch} />
                </div>
            )
        }
    }