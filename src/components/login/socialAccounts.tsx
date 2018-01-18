import * as React from "react";
import { loginGithub } from "../../constants/path";
import "./socialAccounts.less";
export class SocialAccounts extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }
  githubLogin = () => {
    window.location.href = loginGithub;
  };
  render() {
    return (
      <div className="social-accounts">
        <a onClick={this.githubLogin}>
          <i className="iconfont icon-github" />
        </a>
      </div>
    );
  }
}
