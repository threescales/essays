import * as React from "react";
import { withRouter } from "react-router";
import { getWindowScollPostion } from "../../utils/position";

class ScrollToTop extends React.Component<any, any> {
  componentDidMount() {
    // initPosition(this.props.location.key);
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // savePosition(prevProps.location.key);
      // getPosition(this.props.location.key);
      window.scrollTo(0, 0);
    } else {
      // initPosition(this.props.location.key);
    }
  }

  render() {
    return this.props.children;
  }
}
export default withRouter(ScrollToTop);

function initPosition(key) {
  let position = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };
  window.scrollTo(0, 0);
  sessionStorage.setItem(key, JSON.stringify(position));
}

function savePosition(key) {
  let position = getWindowScollPostion();
  sessionStorage.setItem(key, JSON.stringify(position));
}

function getPosition(key) {
  let position: any = sessionStorage.getItem(key);
  if (position) {
    position = JSON.parse(position);
    window.scrollTo(position.top || 0, position.left || 0);
  } else {
    window.scrollTo(0, 0);
  }
}
