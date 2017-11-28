import * as React from 'react'
import Background from '../controlled/background'
import './articleHeader.less'
const jump = require("jump.js")

interface IBookHeaderProps {
    article
    dispatch
}

export default class BookHeader extends React.Component<IBookHeaderProps, any> {
    constructor(props) {
        super(props)
    }
    moveDown=()=> {
        jump.default('#articleBody'),
        {
            duration: 1000,
            offset: 0,
            callback: undefined,
            a11y: false
          }
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
                <a className="move-down" onClick={this.moveDown}>
                    <i className="iconfont icon-move-down"></i>
                </a>
            </div>
        )
    }
}