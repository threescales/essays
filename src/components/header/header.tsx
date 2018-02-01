import * as React from "react";
import * as UserAction from "../../actions/session";
import { getCookie } from "../../utils/cookie";
import CreateNewArticle from "../modal/createNewArticle";
import { Button } from "../buttons/button";
import { Editor } from "draft-js";
import { OwnerAvatar } from "../controlled/toggleableMenu";
import { Popover } from "../popover/popover";
import UserOpera from "../user/userOpera";
import "./header.less";
import { Logo } from "../logo/logo";
interface IHeaderProps {
  dispatch;
  user;
}
export default class Header extends React.Component<IHeaderProps, any> {
  constructor(props) {
    super(props);
  }
  render() {
    const user = this.props.user;
    return (
      <header className="root-header">
        <div className="header-left">
          {user && (
            <OwnerAvatar src={user.avatar || require("./header.png")}>
              <Popover>
                <UserOpera user={user} dispatch={this.props.dispatch} />
              </Popover>
            </OwnerAvatar>
          )}
        </div>
        <div className="header-center animated wobble">
          <Logo />
        </div>
        <div className="header-right">
          <CreateNewArticle user={user} />
        </div>
      </header>
    );
  }
}
