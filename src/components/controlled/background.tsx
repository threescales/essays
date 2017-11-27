import * as React from 'react'
import Uploader from '../uploader/qiniuUploader'
import './background.less'
interface IBackgroundProps {
    isEditable?: boolean
    uploadFinishCallback?: Function
    imageUrl?: string
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
        return (
            <div className="filling">
                {
                    this.props.isEditable
                        ? <Uploader 
                        className="filling"
                        listener={{
                            onTaskProgress: this._onTaskProgress,
                            onTaskSuccess: this._onTaskSuccess
                        }}>
                            <div
                                className="jigloo-background"
                                style={{ backgroundImage: `url(${this.props.imageUrl})`}}>

                            </div>

                        </Uploader>
                        : <div
                            className="jigloo-background"
                            style={{ backgroundImage: `url(${this.props.imageUrl})` }}>

                        </div>
                }
            </div>
        )
    }
}