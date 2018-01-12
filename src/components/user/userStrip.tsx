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
                    <img width={36} height={36} src={user.avatar} />
                </div>
                <div className="user-info">
                    <a className="user-name">
                        {user.name}
                    </a>
                    {this.props.time && <time>{this.props.time}</time>}
                </div>
            </div>
        )
    }
}