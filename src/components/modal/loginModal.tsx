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
    constructor(props) {
        super(props)
    }

    closeModal = () => {
        this.props.dispatch(ShowAction.hide(LOGIN_MODAL))
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.show} contentLabel="登录/注册" close={this.closeModal}>
                    <div className="login-modal">
                        <Login closeModal={this.closeModal} dispatch={this.props.dispatch}/>
                    </div>
                </Modal>
            </div>
        )
    }
}