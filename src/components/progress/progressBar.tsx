import * as React from "react";
import "./progressBar.less";
export const ProgressBar = ({ progress = 0 }) => {
  let width = `${progress}%`;
  return progress && progress != 100 ? (
    <div className="progress-bar">
      <div className="bar" style={{ width }} />
    </div>
  ) : null;
};
