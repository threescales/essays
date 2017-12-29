import * as React from 'react'
const map = require("lodash/map")
import {EditorState,convertFromRaw} from 'draft-js'

import Editor from '../editor/editor'
import './commentContent.less'

interface ICommentContentProps {
    comment
    dispatch
    articleId
}
export default class CommentContent extends React.Component<ICommentContentProps, any> {
    constructor(props) {
        super(props)
    }

    _getChildComments = () => {
        let commentData: any = this.props.comment
        if (commentData.children && commentData.children.length > 0) {
            let childComments = map(commentData.children, (comment) => {
                return <CommentContent comment={comment} key={comment.id} dispatch={this.props.dispatch} articleId={this.props.articleId}/>
            })
            return childComments
        }
        return null
    }

    render() {
        let comment:any = this.props.comment
        let editorState = EditorState.createWithContent(convertFromRaw(comment.content))
        return (
            <div className="comment-content">
                <Editor editorState={editorState} readOnly={true} articleId={this.props.articleId} dispatch={this.props.dispatch}/>
                {
                    this._getChildComments()
                }
            </div>
        )
    }
}