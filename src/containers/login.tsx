import * as React from 'react'
import { connect } from 'react-redux'
import Login from '../components/login/login'
class LoginPage extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Login dispatch={this.props.dispatch} />
            </div>
        )
    }
}

function mapStateToProps(state: any, props: any) {
    return state
}
export default connect(mapStateToProps)(LoginPage);