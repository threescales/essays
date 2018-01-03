import * as React from 'react'
import './userStrip.less'
interface IUserStripProps {
    user
    time?
}

export default class UserStrip extends React.PureComponent<IUserStripProps, any> {
    constructor(props) {
        super(props)
    }

    render() {
        let user = this.props.user
        return (
            <div className="user-strip">
                <div className="avatar">
                    <img src={user.avatar} />
                </div>
                <div>
                    <p className="user-name">
                        {user.name}
                    </p>
                    {this.props.time && <time>{this.props.time}</time>}
                </div>
            </div>
        )
    }
}