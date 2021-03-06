import { putAjax, getAjax, postAjax } from "../utils/ajax";
import * as Path from "../constants/path";
import {
  CREATE_ARTICLE_SUCCESS,
  GET_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_BODY_SUCCESS,
  TOGGLE_ARITCLE_PUBLISH,
  UPDATA_ARTICLE_COUNT,
  ARTICLE_INIT,
  POST_COMMENT_SUCCESS,
  GET_ALL_COMMENTS,
  TOGGLE_ARTICLE_INFO
} from "../constants/index";
import { setWindowTitle } from "../utils/getInfo";
import { EditorState, convertToRaw, RawDraftContentState } from "draft-js";
import { smartArrayToTree } from "../utils/arrayToTree";
import toastr from "utils/toastr";

export const getArticleSuccess = data => {
  return {
    type: GET_ARTICLE_SUCCESS,
    data
  };
};

export const createArticle = (userId, title, description, cover, tags) => {
  return (dispatch: any, getState: Function) => {
    let editorState = EditorState.createEmpty();
    let body = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

    return putAjax(Path.putArticle, {
      userId,
      title,
      description,
      cover,
      tags,
      body
    }).then((result: any) => {
      window.location.href = `/articles/${result.data.id}`;
    });
  };
};

export const getArticleById = (id: string) => {
  return (dispatch: any, getState: Function) => {
    return getAjax(Path.getArticle(id), {}).then((result: any) => {
      if (result.success) {
        setWindowTitle(result.data.title);
        dispatch(getArticleSuccess(result.data));
        return result;
      } else {
        toastr.error(result.message);
        return null;
      }
    });
  };
};

export const saveArticleBody = (id: string, body: string) => {
  return (dispatch: any, getState: Function) => {
    return postAjax(Path.saveArticleBody, {
      id,
      body
    }).then((result: any) => {
      dispatch({
        type: UPDATE_ARTICLE_BODY_SUCCESS,
        article: result.data
      });
    });
  };
};

export const toggleArticlePublish = (
  articleId: string,
  isPublished: boolean
) => {
  return (dispatch: any, getState: Function) => {
    return postAjax(Path.toggleArticlePublish, {
      articleId,
      isPublished
    }).then((result: any) => {
      dispatch({
        type: TOGGLE_ARITCLE_PUBLISH,
        isPublished
      });
    });
  };
};

export const toggleArticleInfo = (
  articleId: string,
  title = null,
  cover = null,
  description = null,
  tags = null
) => {
  let data: any = {
    articleId
  };
  if (title) {
    data.title = title;
  }
  if (description) {
    data.description = description;
  }
  if (tags) {
    data.tags = tags;
  }
  if (cover) {
    data.cover = cover;
  }

  return (dispatch: any, getState: Function) => {
    return postAjax(Path.toggleArticleInfo, data).then((result: any) => {
      dispatch({
        type: TOGGLE_ARTICLE_INFO,
        data
      });
    });
  };
};

export const updateArticleCount = (
  articleId: string,
  type: "read" | "like"
) => {
  return (dispatch: any, getState: Function) => {
    return postAjax(Path.updateCount, {
      articleId,
      type
    }).then((result: any) => {
      if (result.success) {
        let data = result.data;
        dispatch({
          type: UPDATA_ARTICLE_COUNT,
          likeNum: data.likeNum,
          readNum: data.readNum
        });
      }
    });
  };
};

export const postComment = (
  articleId,
  contentState,
  toCommentId = null,
  depth = 0,
  blockKey = null,
  blockText = null,
  offset = null
) => {
  let content = JSON.stringify(convertToRaw(contentState));
  let data: any = {
    articleId,
    content,
    depth
  };
  if (toCommentId) {
    data.toCommentId = toCommentId;
  }
  if (blockKey) {
    data.blockKey = blockKey;
    data.blockText = blockText;
    data.offset = offset;
  }
  return (dispatch: any, getState: Function) => {
    return putAjax(Path.postComment, data).then((result: any) => {
      if (result.success) {
        dispatch({
          type: POST_COMMENT_SUCCESS,
          data: result.data
        });
        return result;
      } else {
        toastr.error(result.message);
        return null;
      }
    });
  };
};

export const getAllComments = articleId => {
  return (dispatch: any, getState: Function) => {
    return getAjax(Path.getComments, {
      articleId
    }).then((result: any) => {
      dispatch({
        type: GET_ALL_COMMENTS,
        data: result.data
      });
    });
  };
};

export const initArticle = () => {
  return {
    type: ARTICLE_INIT
  };
};
