import * as React from "react";
import Modal from "./components/modal";
import Login from "../login/login";
import Signup from "../login/signup";
import * as ShowAction from "../../actions/show";
import * as classnames from "classnames";
import { LOGIN_MODAL } from "../../constants/showKey";
import { dispatch } from "../../store/configure-store";
interface ILoginModalProps {}
export default class LoginModal extends React.Component<ILoginModalProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0
    };
  }

  closeModal = () => {
    dispatch(ShowAction.hide(LOGIN_MODAL));
  };
  toggleTab = index => {
    this.setState({
      tabIndex: index
    });
  };
  render() {
    return (
      <div>
        <Modal contentLabel="登录/注册" close={this.closeModal}>
          <div className="login-signup-modal">
            <div className="tabs">
              <a
                className={classnames({
                  "selected-tab": this.state.tabIndex == 0
                })}
                onClick={() => this.toggleTab(0)}
              >
                登录
              </a>
              <a
                className={classnames({
                  "selected-tab": this.state.tabIndex == 1
                })}
                onClick={() => this.toggleTab(1)}
              >
                注册
              </a>
            </div>
            {this.state.tabIndex == 0 && (
              <Login closeModal={this.closeModal} dispatch={dispatch} />
            )}
            {this.state.tabIndex == 1 && (
              <Signup closeModal={this.closeModal} dispatch={dispatch} />
            )}
          </div>
        </Modal>
      </div>
    );
  }
}
