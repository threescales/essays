import * as React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import CreateNewArticle from '../components/modal/createNewArticle'

class Index extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <p>Hello World</p>
                <CreateNewArticle dispatch={this.props.dispatch}/>
                <img
                    src="https://git-scm.com/book/en/v2/images/remote-branches-3.png" />
            </div>
        )
    }
}

function mapStateToProps(state: any, props: any) {
    return {
        show: state.show
    };
}
export default connect(mapStateToProps)(Index);