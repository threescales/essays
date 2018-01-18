import * as React from "react";
const map = require("lodash/map");
import { EditorState, convertFromRaw } from "draft-js";

import CommentEditor from "../editor/commentEditor";
import UserStrip from "../user/userStrip";
import { IconButton } from "../buttons/iconButton";
import "./commentContent.less";
import DateUtil from "../../utils/date";
import PostComment from "./postComment";
import * as classnames from "classnames";
import { dispatch } from "../../store/configure-store";
interface ICommentContentProps {
  comment;
  articleId;
  fromType?;
}
export default class CommentContent extends React.Component<
  ICommentContentProps,
  any
> {
  constructor(props) {
    super(props);
    this.togglePost = this.togglePost.bind(this);
    this.state = {
      showPostComment: false,
      isAnimating: true
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isAnimating: false
      });
    }, 1000);
  }

  _getChildComments = () => {
    let commentData: any = this.props.comment;
    if (commentData.children && commentData.children.length > 0) {
      let childComments = map(commentData.children, comment => {
        return (
          <CommentContent
            comment={comment}
            key={comment.id}
            articleId={this.props.articleId}
          />
        );
      });
      return childComments;
    }
    return null;
  };
  togglePost() {
    this.setState({
      showPostComment: !this.state.showPostComment
    });
  }
  render() {
    let comment: any = this.props.comment;
    let commentTime = DateUtil.reTime(
      DateUtil.postgrestoDate(comment.createdAt)
    );

    let editorState = EditorState.createWithContent(
      convertFromRaw(comment.content)
    );

    let showPostComment = this.state.showPostComment;
    return (
      <div
        className={classnames({
          "comment-content": true,
          animated: true,
          fadeIn: this.state.isAnimating
        })}
      >
        <UserStrip user={comment.fromUser} time={commentTime} />
        {this.props.fromType != "block" &&
          comment.blockKey && (
            <BlockContent
              blockKey={comment.blockKey}
              blockText={comment.blockText}
            />
          )}
        <CommentEditor
          editorState={editorState}
          readOnly={true}
          dispatch={dispatch}
        />
        {this.props.fromType != "block" && (
          <div className="comment-opera">
            <span className="opera-right">
              <IconButton
                onClick={this.togglePost}
                isActive={showPostComment}
                iconName={showPostComment ? "icon-commentfill" : "icon-comment"}
              />
            </span>
          </div>
        )}
        {showPostComment ? (
          <PostComment
            articleId={this.props.articleId}
            depth={comment.depth}
            toCommentId={comment.id}
            closeComment={this.togglePost}
          />
        ) : null}
        {this._getChildComments()}
      </div>
    );
  }
}

export const BlockContent = ({ blockKey, blockText }) => {
  return (
    <div className="selected-content">
      <a>{blockText}</a>
    </div>
  );
};
