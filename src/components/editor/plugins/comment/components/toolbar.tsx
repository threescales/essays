import * as React from "react";
import CommentButton from "./commentButton";
import { getVisibleSelectionRect, convertFromRaw, EditorState } from "draft-js";
import PostComment from "../../../../comment/postComment";
import "./toolbar.less";
import { getInitPosition } from "../../../../../utils/position";
import * as classnames from "classnames";

const getRelativeParent = element => {
  if (!element) {
    return null;
  }

  const position = window
    .getComputedStyle(element)
    .getPropertyValue("position");
  if (position !== "static") {
    return element;
  }

  return getRelativeParent(element.parentElement);
};

const getBlockKey = element => {
  if (element.className.indexOf("public-DraftStyleDefault-block") > -1) {
    return element.getAttribute("data-offset-key").split("-")[0];
  } else {
    return getBlockKey(element.parentElement);
  }
};

export default class Toolbar extends React.Component<any, any> {
  public toolbar;
  public initElement = document.getElementById("articleBody");
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      selection: null,
      position: {},
      blockKey: "",
      blockText: "",
      showPostComment: false
    };
    this.updateSelection = this.updateSelection.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.resetEditorState = this.resetEditorState.bind(this);
  }

  componentDidMount() {
    this.initSelectListener();
  }
  componentWillUnmount() {
    this.clearSelectListener();
  }

  initSelectListener() {
    // 监听双击事件
    document.addEventListener("dblclick", this.updateSelection, true);

    // 监听释放鼠标按钮事件
    document.addEventListener("mouseup", this.updateSelection, true);
  }

  clearSelectListener() {
    // 监听双击事件
    document.removeEventListener("dblclick", this.updateSelection, true);

    // 监听释放鼠标按钮事件
    document.removeEventListener("mouseup", this.updateSelection, true);
  }

  updateSelection = () => {
    if (window.getSelection) {
      let selection = window.getSelection();

      if (!selection || selection.toString().length == 0) {
        this.setState({
          isVisible: false
        });
        return;
      }

      let blockKey = this.getBlockKey(selection);
      let blockText = selection.toString();
      let editorState = this.props.store.getItem("getEditorState")();
      let contentState = editorState.getCurrentContent();

      if (!contentState.getBlockForKey(blockKey)) {
        this.setState({
          isVisible: false
        });
        return;
      }

      let offset = selection.anchorOffset;
      this.setState({
        selection,
        isVisible: true,
        blockKey,
        blockText,
        offset
      });
      this.getPosition(selection);
    }
  };

  getBlockKey(selection) {
    let parentElement = selection.anchorNode.parentElement;

    let blockKey = getBlockKey(parentElement);
    return blockKey;
  }

  getPosition(selection) {
    const relativeParent = getRelativeParent(this.toolbar.parentElement);
    const toolbarHeight = this.toolbar.clientHeight + 5;
    const relativeRect = (
      relativeParent || document.body
    ).getBoundingClientRect();
    const selectionRect = getVisibleSelectionRect(window);

    if (!selectionRect) {
      return;
    }

    const position = {
      top: selectionRect.top - relativeRect.top - toolbarHeight,
      left:
        selectionRect.left - relativeRect.left + selectionRect.width / 2 - 25
    };
    this.setState({ position });
  }

  showPostComment = () => {
    this.setState({
      showPostComment: true
    });
    this.clearSelectListener();
  };

  hidePostComment = () => {
    this.initSelectListener();
    this.setState({
      showPostComment: false,
      isVisible: false
    });
  };

  resetEditorState = body => {
    if (body) {
      let contentState = convertFromRaw(body);
      let editorState = this.props.store.getItem("getEditorState")();
      let newEditorState = EditorState.push(
        editorState,
        contentState,
        "change-block-data"
      );
      let setEditorState = this.props.store.getItem("setEditorState");
      setEditorState(newEditorState);
    }
  };

  render() {
    let { blockText, blockKey, position, offset } = this.state;

    let data = { ...position };
    if (this.state.isVisible) {
      data.visibility = "visible";
    } else {
      data.visibility = "hidden";
    }

    let commentStyle: any = {};
    commentStyle.top = position.top;
    let initPositon: any = getInitPosition(this.initElement);
    // let right: any = getInitPosition(this.initElement).right - 240;
    if (initPositon.right > 260) {
      commentStyle.left = initPositon.width + initPositon.left + 20;
    } else {
      commentStyle.right = 0;
    }
    return [
      <div
        className={classnames({
          "reader-side-toolbar": true,
          active: this.state.isVisible && !this.state.showPostComment
        })}
        style={data}
        ref={node => {
          this.toolbar = node;
        }}
        key="1"
      >
        <Inner>
          <CommentButton showPostComment={this.showPostComment} />
        </Inner>
        <Arrow />
      </div>,
      this.state.showPostComment ? (
        <PostCommentArea
          articleId={this.props.articleId}
          blockText={blockText}
          blockKey={blockKey}
          depth={0}
          hidePostComment={this.hidePostComment}
          resetEditorState={this.resetEditorState}
          offset={offset}
          commentStyle={commentStyle}
          key="2"
        />
      ) : null
    ];
  }
}

class PostCommentArea extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  hidePostComment = () => {
    this.props.hidePostComment();
  };

  resetEditorState = body => {
    this.props.resetEditorState(body);
  };

  // stopEvent = event => {
  //   window.event ? (window.event.cancelBubble = true) : event.stopPropagation();
  // };

  // componentDidMount() {
  //   document.addEventListener("click", this.hidePostComment, true);
  // }
  // componentWillUnmount() {
  //   document.addEventListener("click", this.hidePostComment, true);
  // }
  render() {
    let { articleId, blockText, blockKey, offset, commentStyle } = this.props;
    return (
      <div
        className="block-post-comment"
        style={commentStyle}
        // onClick={this.stopEvent}
      >
        <a className="close" onClick={this.hidePostComment}>
          <i className="iconfont icon-cha" />
        </a>
        <PostComment
          articleId={articleId}
          blockText={blockText}
          blockKey={blockKey}
          depth={0}
          closeComment={this.hidePostComment}
          resetEditorState={this.resetEditorState}
          offset={offset}
        />
      </div>
    );
  }
}

const Arrow = ({}) => {
  return (
    <div className="highlightMenu-arrowClip">
      <span className="highlightMenu-arrow" />
    </div>
  );
};

const Inner = ({ children }) => {
  return <div className="highlightMenu-inner">{children}</div>;
};
