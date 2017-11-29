import * as React from 'react'
import './articleCard.less'
import {getImageUrl} from '../../utils/getInfo'
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
                <h5>{article.title}</h5>
                <p>{article.description}</p>
                <img src={getImageUrl(article.cover)} />
            </div>
        )
    }
}