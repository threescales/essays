import * as React from "react";
import { EditorState, convertToRaw } from "draft-js";
import CommentEditor from "../editor/commentEditor";
import { postComment } from "../../actions/article";
import "./postComment.less";
import { Button } from "../buttons/button";
import { requireLogin } from "../../utils/requireLogin";
import UserStrip from "../user/userStrip";
import toastr from "../../utils/toastr";
import * as classnames from "classnames";
import { dispatch } from "../../store/configure-store";
interface IPostCommentProps {
  articleId;
  depth;
  toCommentId?;
  blockKey?;
  blockText?;
  closeComment?;
  offset?;
  resetEditorState?;
}

interface IPostCommentState {
  editorState: EditorState;
  showOpera: boolean;
  isPadding: boolean;
  isAnimating: boolean;
}
export default class PostComment extends React.Component<
  IPostCommentProps,
  IPostCommentState
> {
  public timer;
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      showOpera: false,
      isPadding: false,
      isAnimating: true
    };
    this.comment = this.comment.bind(this);
    this.showOpera = this.showOpera.bind(this);
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        isAnimating: false
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  setEditorState = (editorState: EditorState) => {
    this.setState({
      editorState
    });
  };

  comment = () => {
    let { articleId, toCommentId, blockKey, blockText, offset } = this.props;
    let depth = toCommentId ? this.props.depth + 1 : 0;
    let contentState = this.state.editorState.getCurrentContent();
    let firstBlock = contentState.getFirstBlock();
    let blockLength = contentState.getBlockMap().size;
    if (blockLength == 1) {
      if (
        firstBlock.getType() == "unstyled" &&
        firstBlock.getText().trim().length < 1
      ) {
        toastr.error("您好像忘记写什么了...");
        return;
      }
    }
    dispatch(
      postComment(
        articleId,
        contentState,
        toCommentId,
        depth,
        blockKey,
        blockText,
        offset
      )
    ).then(result => {
      //评论成功
      this.hideOpera(result.article);
    });
  };

  @requireLogin
  showOpera() {
    this.setState({
      showOpera: true
    });
  }
  hideOpera = article => {
    this.setState(
      {
        isPadding: true,
        showOpera: false,
        editorState: EditorState.createEmpty()
      },
      () => {
        this.setState({
          isPadding: false
        });
        if (this.props.closeComment) {
          this.props.closeComment();
        }
        if (this.props.resetEditorState) {
          this.props.resetEditorState(article.body);
        }
      }
    );
  };

  render() {
    return (
      <div
        onMouseDown={this.showOpera}
        className={classnames({
          "post-comment": true,
          animated: true,
          fadeInDown: this.state.isAnimating
        })}
      >
        {this.state.isPadding ? null : (
          <CommentEditor
            editorState={this.state.editorState}
            setEditorState={this.setEditorState}
            dispatch={dispatch}
            readOnly={false}
          />
        )}
        {this.state.showOpera && (
          <div className="opera-new-comment">
            <Button onClick={this.hideOpera} className="cancel">
              取消
            </Button>
            <Button onClick={this.comment}>发送</Button>
          </div>
        )}
      </div>
    );
  }
}
