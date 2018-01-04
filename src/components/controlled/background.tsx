import * as React from 'react'
import Uploader from '../uploader/qiniuUploader'
import { getImageUrl } from '../../utils/getInfo'
import './background.less'
import { ProgressBar } from '../progress/progressBar'
import * as classnames from "classnames"
const DEFAULT_IMG = "http://api.dujin.org/bing/1920.php";
const extend = require("lodash/extend")
interface IBackgroundProps {
    isEditable?: boolean
    uploadFinishCallback?: Function
    imageUrl?: string
    style?: any
    width?
    height?
}

export default class Background extends React.Component<IBackgroundProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            progress: 0
        }
    }
    _onTaskProgress = (task: UploaderTask) => {
        this.setState({
            progress: task.progress
        })

    }
    _onTaskSuccess = (task: UploaderTask) => {
        this.setState({
            progress: 100
        },
            this.props.uploadFinishCallback(task.result.hash)
        )
    }
    render() {
        let style: any = { backgroundImage: `url(${getImageUrl(this.props.imageUrl, this.props.width, this.props.height) || DEFAULT_IMG})` }
        style = extend(this.props.style || {}, style)
        let background = <div
            className={classnames({ "jigloo-background": true, "background-edit": this.props.isEditable })}
            style={style}>
            {this.props.children}
            {this.props.isEditable && <span>点击上传图片</span>}
            <ProgressBar progress={this.state.progress} />
        </div>
        return (
            <div className="filling">
                {
                    this.props.isEditable ?
                        <Uploader
                            className="filling"
                            listener={{
                                onTaskProgress: this._onTaskProgress,
                                onTaskSuccess: this._onTaskSuccess
                            }}>
                            {background}

                        </Uploader>
                        : background
                }
            </div>
        )
    }
}
