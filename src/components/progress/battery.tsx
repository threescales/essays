import * as React from 'react'
import './battery.less'
interface IBetteryProps {
    progress
}

export default class Battery extends React.PureComponent<IBetteryProps, any> {
    constructor(props) {
        super(props)
    }

    render() {
        let progress = this.props.progress
        return  <div className="battery">
            {progress}
        </div>
    }
}