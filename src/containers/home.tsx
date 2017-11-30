import * as React from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import map = require("lodash/map")
import CreateNewArticle from '../components/modal/createNewArticle'
import * as HomeActions from '../actions/home'
import ArticleCard from '../components/articleCard/articleCard'
import LazyLoad from "react-lazyload"
import './styles/home.less'
class Index extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.props.dispatch(HomeActions.getAllArticles())
    }
    renderItem(index, key) {
        return <ArticleCard key={key} article={this.props.home.toJS().articles[index]} />

    }
    render() {
        let articleCards = map(this.props.home.toJS().articles, (article: any) => {
            return <LazyLoad key={article._id} height={300}><ArticleCard article={article} /></LazyLoad>
        })
        return (
            <div>
                <CreateNewArticle dispatch={this.props.dispatch} />
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