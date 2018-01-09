import * as React from 'react'
import './commentButton.less'
export default class CommentButton extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            showPostComment: false
        }
    }
    onMouseDown = (event) => {
        event.preventDefault();
        this.props.showPostComment()

    }
    render() {
        let { blockKey, blockText, position } = this.props
        return (<div
            className={''}
            onMouseDown={this.onMouseDown}>
            <a>
                <i className="iconfont icon-comment"></i>
            </a>
        </div>
        )
    }
}