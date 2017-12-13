import * as React from 'react'
import {connect} from 'react-redux'
import {AppContainer} from './app'

@AppContainer
class AccountContainer extends React.Component<any,any> {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div>
                账户页
            </div>
        )
    }
}

function mapStateToProps(state: any, props: any) {
    return state
}
export default connect(mapStateToProps)(AccountContainer);