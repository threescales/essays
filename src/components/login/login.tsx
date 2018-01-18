import * as React from "react";
import { ValidateInput } from "../controlled/input";
import { Button } from "../buttons/button";
import * as UserAction from "../../actions/session";
import { SocialAccounts } from "app/components/login/socialAccounts";
import * as ValidateUtils from "utils/validate";

import "./login.less";

interface ILoginProps {
  dispatch;
  closeModal?;
}
export default class Login extends React.Component<ILoginProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      password: "",
      isActive: false
    };
  }
  toggleAccount = e => {
    this.setState({
      account: e.target.value
    });
  };
  togglePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  login = () => {
    let account = this.state.account;
    let password = this.state.password;

    if (window.document.getElementsByClassName("validate-message").length > 0) {
      return;
    }

    if (!account || !password) {
      toastr.error("您还有信息没填哦~");
      return;
    }

    this.props
      .dispatch(UserAction.login(account, password))
      .then((result: any) => {
        if (result.success) {
          this.props.closeModal && this.props.closeModal();
        }
      });
  };
  render() {
    return (
      <div className="login-frame">
        <ValidateInput
          value={this.state.account}
          placeholder="请输入您的邮箱"
          onChange={this.toggleAccount}
          validations={[
            { message: "邮箱不能为空~", verify: ValidateUtils.isEmpty },
            {
              message: "请输入正确格式的邮箱~",
              verify: ValidateUtils.checkIsNotEmail
            }
          ]}
        />
        <ValidateInput
          value={this.state.password}
          type="password"
          placeholder="请输入您的密码"
          onChange={this.togglePassword}
          validations={[
            { message: "密码不能为空哦~", verify: ValidateUtils.isEmpty },
            {
              message: "请输入6~20位密码",
              verify: ValidateUtils.checkPasswordLength
            }
          ]}
        />
        <Button onClick={this.login} isActive={this.state.isActive}>
          登录
        </Button>
        <SocialAccounts />
      </div>
    );
  }
}
