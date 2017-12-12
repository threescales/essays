import * as React from 'react';
import * as UserAction from '../actions/session'
import { LOGIN_MODAL } from '../constants/showKey'
import Login from '../components/login/login'
export const AppContainer = (Container: any): any =>
    class CommonContainer extends React.Component<any, any> {
        constructor(props) {
            super(props)
        }
        componentWillMount() {
            this.props.dispatch(UserAction.getUserById())
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
                    {this.props.show.toJS()[LOGIN_MODAL] &&
                        <div className="login-modal">
                            <Login/>
                        </div>
                    }
                </div>
            )
        }
    }