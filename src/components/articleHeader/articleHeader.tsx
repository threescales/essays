import * as React from 'react'
import Background from '../controlled/background'
import './articleHeader.less'
const jump = require("jump.js")
import UserCard from '../user/userCard'
interface IBookHeaderProps {
    article
    dispatch
    user
}

export default class BookHeader extends React.Component<IBookHeaderProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    moveDown = () => {
        jump.default('#articleBody'),
            {
                duration: 300,
                offset: 0,
                callback: undefined,
                a11y: false
            }
    }
    render() {
        let article = this.props.article
        return (
            <div>
                <div className="article-header">
                    <Background
                        imageUrl={article.cover}
                        isEditable={false}
                        style={{ opacity: 0.6, position: 'absolute' }}
                        width={this.state.width}
                        height={this.state.height}
                    />
                    <div className="">
                        <UserCard user={this.props.user} />
                    </div>
                    <div className="content">
                        <h1>{article.title}</h1>
                    </div>
                    <a className="move-down" onClick={this.moveDown}>
                        <i className="iconfont icon-move-down"></i>
                    </a>
                </div>
            </div>
        )
    }
}