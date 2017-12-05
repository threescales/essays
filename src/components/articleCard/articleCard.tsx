import * as React from 'react'
import './articleCard.less'
import { getImageUrl } from '../../utils/getInfo'
import { showDate,getDate } from '../../utils/date'
interface IArticleCardProps {
    article
}

export default class ArticleCard extends React.PureComponent<IArticleCardProps, any> {
    constructor(props) {
        super(props)
    }
    jump = () => {
        window.location.href = `/articles/${this.props.article._id}`
    }
    render() {
        const article = this.props.article

        return (
            <div className="article-card" onClick={this.jump}>
                <div className="left-info">
                    <time>{`by:${getDate(article.createTime)}`}</time>
                </div>
                <div className="right-info">
                    {!article.isPublish && <span>未发布</span>}
                </div>
                <img src={getImageUrl(article.cover)} />
                <article>
                    <h5>{article.title}</h5>
                    <p>{article.description}</p>
                </article>
            </div>
        )
    }
}