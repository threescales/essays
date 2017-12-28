import * as React from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import CommentEditor from '../editor/commentEditor'
import { postComment } from '../../actions/article'
import './postComment.less'

interface IPostCommentProps {
    dispatch
    articleId
    depth
    toCommentId?
    blockKey?
    blockText?
}
export default class PostComment extends React.Component<IPostCommentProps, any> {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
            showOpera: false
        }
    }

    setEditorState = (editorState: EditorState) => {
        this.setState({
            editorState
        })
    }

    postComment() {
        let articleId = this.props.articleId
        let toCommentId = this.props.toCommentId
        let depth = this.props.toCommentId ? this.props.depth + 1 : 0
        let blockKey = this.props.blockKey
        let blockText = this.props.blockText
        let content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentState()))
        this.props.dispatch(postComment(articleId, content, toCommentId, depth, blockKey, blockText)).then((result) => {
            //评论成功
        })
    }

    showOpera = () => {
        this.setState({
            showOpera: true
        })
    }
    hideOpera = () => {
        this.setState({
            showOpera: false
        })
    }

    render() {
        return <div onMouseDown={this.showOpera} className="post-comment" tabIndex={0} onBlur={this.hideOpera}>
            <CommentEditor
                editorState={this.state.editorState}
                setEditorState={this.setEditorState}
                dispatch={this.props.dispatch}
                readOnly={false}
            />
            {
                this.state.showOpera && <div className="opera-new-comment">

                </div>
            }
        </div>
    }
}