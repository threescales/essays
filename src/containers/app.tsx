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
            this.props.dispatch(UserAction.getUserById())
            // this.props.dispatch(ShowAction.show(LOGIN_MODAL))
        }
        render() {
            let show = true
            if (window.location.href.indexOf("myarticles") > 0) {
                show = false
                if (this.props.session.toJS().user) {
                    show = true
                }
            }
            return (
                <div>
                    {show && <Container {...this.props} />}
                    <LoginModal show={this.props.show.toJS()[LOGIN_MODAL]} dispatch={this.props.dispatch}/>
                </div>
            )
        }
    }