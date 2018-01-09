import * as React from 'react'

export default class CommentButton extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    onMouseDown = (event) => {
        event.preventDefault();
    }
    render() {
        
        return (
            <div
                className={''}
                onMouseDown={this.onMouseDown}>
                <a>
                    <i className="iconfont icon-comment"></i>
                </a>
            </div>
        )
    }
}