import * as React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import {createArticle} from '../actions/article'
class Index extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    createArticle = () => {
        let title ='第一篇文章'
        let description="测试"
        let cover="http://cdn.yibencezi.com/assets/6466a08b64721a932f38e8a24e40ff23.png"
        let tag = '测试'
        this.props.dispatch(createArticle(title,description,cover,tag))
    }
    render() {
        return (
            <div>
                <p>Hello World</p>
                <button onClick={this.createArticle}>创建文章</button>
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