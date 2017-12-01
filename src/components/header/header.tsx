import * as React from 'react'
import * as UserAction from '../../actions/session'
import { getCookie } from '../../utils/cookie'
import CreateNewArticle from '../modal/createNewArticle'
interface IHeaderProps {
    dispatch
    user
}
export default class Header extends React.Component<IHeaderProps, any> {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (!this.props.user) {
            let userId =
                this.props.dispatch(UserAction.getUserById())
        }
    }

    render() {
        const user = this.props.user
        return (
            <header>
                {user && user.name}
                {user && <CreateNewArticle dispatch={this.props.dispatch} user={this.props.user} />}
            </header>
        )
    }
}