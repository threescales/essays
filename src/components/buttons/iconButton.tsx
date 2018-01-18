import * as React from "react";
import * as classnames from "classnames";
export const IconButton = ({ iconName, onClick, isActive }) => {
  return (
    <a
      onClick={onClick}
      className={classnames({ "icon-button": true, active: isActive })}
    >
      <i className={`iconfont ${iconName}`} />
    </a>
  );
};
