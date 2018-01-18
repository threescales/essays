import * as React from "react";
import * as classnames from "classnames";
import "./button.less";
export const Button = ({
  onClick,
  isActive = false,
  children,
  onlyPC = false,
  className = ""
}) => {
  return (
    <button
      className={classnames({
        button: true,
        active: isActive,
        "only-pc": onlyPC,
        className: true
      })}
      disabled={isActive}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
