import * as React from 'react'
import { EditorState, convertToRaw } from 'draft-js'
import CommentEditor from '../editor/commentEditor'
import { postComment } from '../../actions/article'
import './postComment.less'
import { Button } from "../buttons/button";
import { requireLogin } from "../../utils/requireLogin"
import UserStrip from '../user/userStrip'
interface IPostCommentProps {
    dispatch
    articleId
    depth
    toCommentId?
    blockKey?
    blockText?
    closeComment?
}

interface IPostCommentState {
    editorState: EditorState
    showOpera: boolean
}
export default class PostComment extends React.Component<IPostCommentProps, IPostCommentState> {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
            showOpera: false
        }
        this.comment = this.comment.bind(this)
        this.showOpera = this.showOpera.bind(this)
    }

    setEditorState = (editorState: EditorState) => {
        this.setState({
            editorState
        })
    }

    comment = () => {
        let articleId = this.props.articleId
        let toCommentId = this.props.toCommentId
        let depth = this.props.toCommentId ? this.props.depth + 1 : 0
        let blockKey = this.props.blockKey
        let blockText = this.props.blockText
        let contentState = this.state.editorState.getCurrentContent()
        this.props.dispatch(postComment(articleId, contentState, toCommentId, depth, blockKey, blockText)).then((result) => {
            //评论成功
            this.hideOpera()
            if (this.props.closeComment) {
                this.props.closeComment()
            }
        })
    }

    @requireLogin
    showOpera() {
        this.setState({
            showOpera: true
        })
    }
    hideOpera = () => {
        this.setState({
            showOpera: false,
            editorState: EditorState.createEmpty()
        })
    }

    render() {
        return <div onMouseDown={this.showOpera} className="post-comment" >
            <CommentEditor
                editorState={this.state.editorState}
                setEditorState={this.setEditorState}
                dispatch={this.props.dispatch}
                readOnly={false}
            />
            {
                this.state.showOpera &&
                <div className="opera-new-comment">
                    <Button onClick={this.comment}>发送</Button>
                </div>
            }
        </div>
    }
}