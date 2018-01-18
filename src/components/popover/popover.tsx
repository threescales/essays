import * as React from "react";
import "./popover.less";

export const Popover = ({ children }) => {
  return (
    <div className="popover">
      <div className="arrow" />
      {children}
    </div>
  );
};
