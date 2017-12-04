import * as React from 'react';
import { connect } from "react-redux";
import map = require("lodash/map")
import Header from '../components/header/header'
import * as HomeActions from '../actions/home'
import ArticleCard from '../components/articleCard/articleCard'
import LazyLoad from "react-lazyload"
class MyArticles extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.dispatch(HomeActions.getMyArticles(this.props.session.toJS().user))
    }
    render() {
        let articleCards = map(this.props.home.toJS().articles, (article: any) => {
            return <LazyLoad key={article._id} height={300}><ArticleCard article={article} /></LazyLoad>
        })
        return (
            <div>
                <Header dispatch={this.props.dispatch} user={this.props.session.toJS().user} />
                <div className="article-list">
                    {articleCards}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any, props: any) {
    return state
}
export default connect(mapStateToProps)(MyArticles);