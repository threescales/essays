import * as React from 'react'
import Background from '../controlled/background'
import './articleHeader.less'

interface IBookHeaderProps {
    article
    dispatch
}

export default class BookHeader extends React.Component<IBookHeaderProps, any> {
    constructor(props) {
        super(props)
    }

    render() {
        let article = this.props.article
        return (
            <div className="article-header">
                <Background imageUrl={article.cover} isEditable={false} style={{ opacity: 0.6, position: 'absolute' }}>
                </Background>
                <div className="content">
                    <h1>{article.title}</h1>
                </div>
            </div>
        )
    }
}