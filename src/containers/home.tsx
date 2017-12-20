import * as React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import map = require("lodash/map")
import * as HomeActions from '../actions/home'
import ArticleCard from '../components/articleCard/articleCard'
import LazyLoad from "react-lazyload"
import { initPosition } from '../utils/position'

import './styles/home.less'
import {AppContainer} from './app'

@AppContainer
class Index extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.props.dispatch(HomeActions.getAllArticles())
    }
    componentWillUnmount() {
        // initPosition()
    }
    render() {
        let articleCards = map(this.props.home.toJS().articles, (article: any) => {
            return <LazyLoad key={article.id} height={300}><ArticleCard article={article} history={this.props.history}/></LazyLoad>
        })
        return (
            <div>
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
export default connect(mapStateToProps)(Index);