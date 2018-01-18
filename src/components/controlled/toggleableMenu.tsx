import makeToggleable from "./toggle";
import * as React from "react";

@makeToggleable
export class OwnerAvatar extends React.Component<any, any> {
  render() {
    return <img src={this.props.src} />;
  }
}
