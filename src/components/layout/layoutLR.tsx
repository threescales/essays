import * as React from "react";
import "./layoutLR.less";

export const LayoutLR = ({ children, classNames = "" }) => {
  return <div className={`layout-lr-frame ${classNames}`}>{children}</div>;
};

export const LayoutLeft = ({ children, classNames = "" }) => {
  return <div className={`layout-left ${classNames}`}>{children}</div>;
};

export const LayoutRight = ({ children, classNames = "" }) => {
  return <div className={`layout-right ${classNames}`}>{children}</div>;
};
