import * as React from "react";
import Background from "../controlled/background";
import "./articleHeader.less";
const jump = require("jump.js");
import UserCard from "../user/userCard";
import { Button } from "../buttons/button";
import CreateNewArticle from "../modal/createNewArticle";
import * as ArticleAction from "../../actions/article";
import * as ShowAction from "../../actions/show";
import { requireLogin } from "../../utils/requireLogin";
import { EDITOR } from "../../constants/showKey";
import { Logo } from "../logo/logo";
import { getImgUrl } from "../../utils/url";
interface IBookHeaderProps {
  article;
  dispatch;
  author;
  isOwner;
  showEditor;
}

export default class BookHeader extends React.Component<IBookHeaderProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
    this.toggleEditor = this.toggleEditor.bind(this);
  }
  moveDown = () => {
    jump.default("#articleBody"),
      {
        duration: 300,
        offset: 0,
        callback: undefined,
        a11y: false
      };
  };

  @requireLogin
  toggleEditor() {
    if (this.props.showEditor) {
      this.props.dispatch(ShowAction.hide(EDITOR));
    } else {
      this.props.dispatch(ShowAction.show(EDITOR));
    }
  }
  toogleArticlePublish = () => {
    this.props.dispatch(
      ArticleAction.toggleArticlePublish(
        this.props.article.id,
        !this.props.article.isPublished
      )
    );
  };
  changeBackGround = key => {
    let imageUrl = getImgUrl(key);
    this.props.dispatch(
      ArticleAction.toggleArticleInfo(this.props.article.id, null, imageUrl)
    );
  };
  render() {
    let article = this.props.article;
    let author = this.props.author;
    return (
      <>
        <div className="article-header">
          <Logo className="return-index" />
          <Background
            imageUrl={article.cover}
            isEditable={this.props.showEditor ? true : false}
            style={{ opacity: 0.6, position: "absolute" }}
            width={this.state.width}
            height={this.state.height}
            uploadFinishCallback={this.changeBackGround}
          />
          <div className="">
            <UserCard user={this.props.author} />
          </div>
          <div className="content">
            <h1>{article.title}</h1>
          </div>
          <a className="move-down" onClick={this.moveDown}>
            <i className="iconfont icon-move-down" />
          </a>
        </div>
        <div className="article-opera-header">
          <div className="header-left" />
          {this.props.isOwner && (
            <div className="header-right">
              <Button onClick={this.toggleEditor} onlyPC={true}>
                {this.props.showEditor ? "保存" : "编辑"}
              </Button>
              <Button onClick={this.toogleArticlePublish} onlyPC={true}>
                {this.props.article.isPublished ? "下架" : "发布"}
              </Button>
            </div>
          )}
        </div>
      </>
    );
  }
}
