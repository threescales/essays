import * as React from 'react'
import blurify = require('blurify')
interface IBlurImage {
    src
    className?
}
export default class BlurImage extends React.Component<IBlurImage, any> {
    public showImage
    public setIntervalId
    constructor(props) {
        super(props)
        this.state = {
            blur: 10
        }
    }
    componentDidMount() {
        this.setIntervalId = setInterval(() => {
            if (this.state.blur > 0) {
                this.setState({
                    blur: this.state.blur - 1
                })
            } else {
                clearInterval(this.setIntervalId)
                this.setIntervalId=null
                console.log(this.setIntervalId)
            }
        },100)
    }
    render() {
        return (
            <img ref={element => this.showImage = element} src={this.props.src} style={{filter:`blur(${this.state.blur}px)`}}/>
        )
    }
}