import * as React from 'react'
import Modal from './components/modal'
import Login from '../login/login'
import * as ShowAction from '../../actions/show'
import { LOGIN_MODAL } from '../../constants/showKey'
interface ILoginModalProps {
    show
    dispatch
}
export default class LoginModal extends React.Component<ILoginModalProps, any> {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.show} contentLabel="登录/注册" close={()=>this.props.dispatch(ShowAction.hide(LOGIN_MODAL))}>
                    <div className="login-modal">
                        <Login />
                    </div>
                </Modal>
            </div>
        )
    }
}