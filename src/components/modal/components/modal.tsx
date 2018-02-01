import * as Modal from "react-modal";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./modal.less";

interface ICustomModalProps {
  close;
  contentLabel?;
}
export default class CustomModal extends React.Component<
  ICustomModalProps,
  any
> {
  public el;
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }
  render() {
    return ReactDOM.createPortal(
      <Modal
        isOpen={true}
        contentLabel={this.props.contentLabel}
        className="modal-frame"
        style={{ overlay: { zIndex: 10 } }}
      >
        <a className="close-modal" onClick={this.props.close}>
          <i className="iconfont icon-cha" />
        </a>
        {this.props.children}
      </Modal>,
      this.el
    );
  }
}
