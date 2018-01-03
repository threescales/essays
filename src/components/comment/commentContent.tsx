import * as React from 'react'
const map = require("lodash/map")
import { EditorState, convertFromRaw } from 'draft-js'

import Editor from '../editor/editor'
import UserStrip from "../user/userStrip"
import { IconButton } from '../buttons/iconButton'
import './commentContent.less'
import DateUtil from '../../utils/date'
import PostComment from './postComment'
interface ICommentContentProps {
    comment
    dispatch
    articleId
}
export default class CommentContent extends React.Component<ICommentContentProps, any> {
    constructor(props) {
        super(props)
        this.togglePost = this.togglePost.bind(this)
        this.state = {
            showPostComment: false
        }
    }

    _getChildComments = () => {
        let commentData: any = this.props.comment
        if (commentData.children && commentData.children.length > 0) {
            let childComments = map(commentData.children, (comment) => {
                return <CommentContent comment={comment} key={comment.id} dispatch={this.props.dispatch} articleId={this.props.articleId} />
            })
            return childComments
        }
        return null
    }
    togglePost() {
        this.setState({
            showPostComment: !this.state.showPostComment
        })
    }
    render() {
        let comment: any = this.props.comment
        let commentTime = DateUtil.reTime(DateUtil.postgrestoDate(comment.createdAt))

        let editorState = EditorState.createWithContent(convertFromRaw(comment.content))

        let showPostComment = this.state.showPostComment
        return (
            <div className="comment-content">
                <UserStrip user={comment.fromUser} time={commentTime}/>
                <Editor editorState={editorState} readOnly={true} articleId={this.props.articleId} dispatch={this.props.dispatch} />
                <div className="comment-opera">
                    <span className="opera-right">
                        <IconButton onClick={this.togglePost} isActive={showPostComment} iconName={showPostComment ? "icon-commentfill" : "icon-comment"} />
                    </span>
                </div>
                {
                    showPostComment ?
                        <PostComment
                            dispatch={this.props.dispatch}
                            articleId={this.props.articleId}
                            depth={comment.depth}
                            toCommentId={comment.id}
                            closeComment={this.togglePost}
                        /> : null
                }
                {
                    this._getChildComments()
                }
            </div>
        )
    }
}
