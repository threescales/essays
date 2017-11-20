import React = require("react");
import { default as initQiniuUploader } from "./initQiniuBuilder";
import * as classnames from "classnames";

interface IUploaderProps extends IUpdateOptions {
  onClick?(e: Event, QiniuUploader:any);
  className?: string;
}

export default
  class Uploader extends React.PureComponent<IUploaderProps, {}> {
  uploader: IQiniuUploader;
  constructor(props:any) {
    super(props);
    this.uploader = initQiniuUploader(this.props);
  }

  chooseFile = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e, this.uploader);
      return;
    }
    this.uploader.chooseFile();
  }

  render() {
    const { className = "" } = this.props;
    return <div className={ classnames("Uploader", className) } onClick={ this.chooseFile }>
      { this.props.children }
    </div>;
  }
}

export const CDN_HOST = "http://image.zymlj.net/";
export function filePublicPathGen(fileKey: string, size?: number) {
  if (fileKey) {
    let ret = `${CDN_HOST}${fileKey}`;
    if (size) {
      ret = ret + `?imageView2/1/w/${size}/h/${size}`;
    }
    return ret;
  }
}
