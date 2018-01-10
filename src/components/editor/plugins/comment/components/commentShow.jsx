import React, { Component } from 'react';
import unionClassNames from 'union-class-names';
const filter = require('lodash/filter')
const includes = require('lodash/includes')
import './commentShow.less'
import store from '../../../../../store/configure-store'
import CommentArea from '../../../../comment/commentArea'
// The component we render when we encounter a hyperlink in the text
export default class Comment extends Component {
  constructor(props) {
    super(props)
    this.state ={
      comments:[],
      showComment:false,
      artilceId:null
    }
  }

  showComment = () => {
    let entity = this.props.contentState.getEntity(this.props.entityKey)
    let commentIds = entity.get('data').commentIds

    let articleState = store.getState().article.toJS()
    let allComments = articleState.comments
    let articleId = articleState.article.id

    let comments = filter(allComments,(comment)=> {
      return includes(commentIds,comment.id)
    })
    this.setState({
      comments,showComment:true,
      articleId
    })
  }

  render() {
    const {
      decoratedText = '',
      theme = {},
      target = '_self',
      rel = 'noreferrer noopener',
      className,
      component,
      dir, // eslint-disable-line no-unused-vars
      entityKey, // eslint-disable-line no-unused-vars
      getEditorState, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      setEditorState, // eslint-disable-line no-unused-vars
      children,
      contentState, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    const combinedClassName = unionClassNames('comment-selected-text', className);

    const props = {
      ...otherProps,
      target,
      rel,
      className: combinedClassName,
    };
    return <span {...props}>
      {children}
      <a className="open-comment-button" onClick={this.showComment}><i className="iconfont icon-asterisks-1-copy" style={{ fontSize: '10px' }}></i></a>
      {
        this.state.showComment&&
        <CommentArea artilceId={this.state.artilceId} comments={this.state.comments} fromType="block"/>
      }
    </span>;
  }
}
