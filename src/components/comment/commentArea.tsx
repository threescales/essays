import * as React from 'react'
import './commentArea.less';
import { smartArrayToTree } from '../../utils/arrayToTree'
import PostComment from './postComment'
import CommentContent from './commentContent'

const map = require("lodash/map")

interface ICommentAreaProps {
    comments
    articleId
    dispatch
}

export default class CommentArea extends React.PureComponent<ICommentAreaProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            commentTree: getCommentTree(props.comments)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            commentTree: getCommentTree(nextProps.comments)
        })
    }

    render() {
        return (
            <section className="comment-area">
                {
                    map(this.state.commentTree, (comment) => {
                        return <CommentContent comment={comment} key={comment.id} articleId={this.props.articleId} dispatch={this.props.dispatch} />
                    })
                }
                <PostComment articleId={this.props.articleId} dispatch={this.props.dispatch} depth={0} />
            </section>
        )
    }
}

function getCommentTree(commentArray) {
    return smartArrayToTree(commentArray, {
        pid: 'toCommentId'
    })
}