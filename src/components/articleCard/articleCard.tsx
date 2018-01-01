import * as React from 'react'
import './articleCard.less'
import { getImageUrl } from '../../utils/getInfo'
import DateUtils from '../../utils/date'
import * as classnames from 'classnames'
interface IArticleCardProps {
    article
    history
}

export default class ArticleCard extends React.PureComponent<IArticleCardProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            showAnimate: false
        }
    }
    jump = () => {
        this.setState({
            showAnimate: true
        }, () => {
            let articleId = this.props.article.id
            let history = this.props.history
            setTimeout(function () {
                history.push(`/articles/${articleId}`)
            }, 700)
        })
    }
    render() {
        const article = this.props.article

        return (
            <div
                className={classnames({ "article-card": true, "animated": this.state.showAnimate, "zoomOutRight": this.state.showAnimate })}
                onClick={this.jump}
            >
                <div className="left-info">
                    <time>{`by:${DateUtils.getFormattedDateString(DateUtils.postgrestoDate(article.createdAt))}`}</time>
                </div>
                <div className="right-info">
                    {!article.isPublished && <span>未发布</span>}
                </div>
                <img src={getImageUrl(article.cover, 750, 400)} />
                <article>
                    <h5>{article.title}</h5>
                    <p>{article.description}</p>
                </article>
            </div>
        )
    }
}