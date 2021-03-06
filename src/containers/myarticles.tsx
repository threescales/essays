import * as React from "react";
import { connect } from "react-redux";
import map = require("lodash/map");
import * as HomeActions from "../actions/home";
import ArticleCard from "../components/articleCard/articleCard";
import LazyLoad from "react-lazyload";
import { initPosition } from "../utils/position";
import { AppContainer } from "./app";

@AppContainer
class MyArticles extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.session.toJS().user) {
      this.props.dispatch(
        HomeActions.getMyArticles(this.props.session.toJS().user.id)
      );
    }
  }
  componentWillUnmount() {
    initPosition();
  }
  render() {
    let articleCards = map(this.props.home.toJS().articles, (article: any) => {
      return (
        <LazyLoad key={article.id} height={300}>
          <ArticleCard article={article} history={this.props.history} />
        </LazyLoad>
      );
    });
    return (
      <div>
        <div className="article-list">{articleCards}</div>
      </div>
    );
  }
}

function mapStateToProps(state: any, props: any) {
  return state;
}
export default connect(mapStateToProps)(MyArticles);
