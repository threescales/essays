import * as React from "react";
import { connect } from "react-redux";
import {login} from "../actions/session";
import "./app.less";
class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
      this.props.dispatch(login("1111"));
    }
    render() {
        return (
            <div className="init">
                欢迎来到英雄联盟
            </div>
        );
    }
}
function mapStateToProps(state: any, props: any) {
    return {
        token: props.session
    };
}
export default connect(mapStateToProps)(App);