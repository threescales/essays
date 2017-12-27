import { putAjax, getAjax, postAjax } from '../utils/ajax'
import * as Path from '../constants/path'
import {
    CREATE_ARTICLE_SUCCESS,
    GET_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_BODY_SUCCESS,
    TOGGLE_ARITCLE_PUBLISH,
    UPDATA_ARTICLE_COUNT,
    ARTICLE_INIT,
    POST_COMMENT_SUCCESS,
    GET_ALL_COMMENTS,
} from '../constants/index'
import {setWindowTitle} from "../utils/getInfo"
import { EditorState, convertToRaw, RawDraftContentState } from 'draft-js'
import {smartArrayToTree} from '../utils/arrayToTree'
export const getArticleSuccess = (data) => {
    return {
        type: GET_ARTICLE_SUCCESS,
        data
    }
}

export const createArticle = (userId, title, description, cover, tags) => {
    return (dispatch: any, getState: Function) => {
        let editorState = EditorState.createEmpty()
        let body = JSON.stringify(convertToRaw(editorState.getCurrentContent()))

        return putAjax(Path.putArticle, {
            userId, title, description, cover, tags, body
        }).then((result: any) => {
            window.location.href = `/articles/${result.data.id}`
        })
    };
};

export const getArticleById = (id: string) => {
    return (dispatch: any, getState: Function) => {
        return getAjax(Path.getArticle(id), {
        }).then((result: any) => {
            setWindowTitle(result.data.title)
            dispatch(getArticleSuccess(result.data))
            return result
        })
    }
}

export const saveArticleBody = (id: string, contentState: RawDraftContentState) => {
    let body = JSON.stringify(contentState)
    return (dispatch: any, getState: Function) => {
        return postAjax(Path.saveArticleBody, {
            id, body
        }).then((result: any) => {
            dispatch({
                type: UPDATE_ARTICLE_BODY_SUCCESS,
                body:contentState
            })
        })
    }
}

export const toggleArticlePublish = (articleId: string, isPublished: boolean) => {
    return (dispatch: any, getState: Function) => {
        return postAjax(Path.toggleArticlePublish, {
            articleId, isPublished
        }).then((result: any) => {
            dispatch({
                type: TOGGLE_ARITCLE_PUBLISH,
                isPublished
            })
        })
    }
}

export const updateArticleCount = (articleId: string, type: 'read' | 'like') => {
    return (dispatch: any, getState: Function) => {
        return postAjax(Path.updateCount, {
            articleId, type
        }).then((result: any) => {
            dispatch({
                type: UPDATA_ARTICLE_COUNT,
                likeNum:result.likeNum,
                readNum:result.readNum
            })
        })
    }
}

export const postComment = (articleId,content,toCommentId=null,depth=0,blockKey=null,blockText=null) => {
    return(dispatch: any, getState: Function) => {
        return putAjax(Path.postComment, {
            articleId,content,toCommentId,depth,blockKey,blockText
        }).then((result:any) => {
            dispatch({
                type:POST_COMMENT_SUCCESS,
                data:result.data
            })
        })
    }
}

export const getAllComments = (articleId) => {
    return(dispatch: any, getState: Function) => {
        return getAjax(Path.getComments,{
            articleId
        }).then((result:any)=> {
            console.log(smartArrayToTree(result.data,{
                pid:'toCommentId'
            }))
            dispatch({
                type:GET_ALL_COMMENTS,
                data:result.data
            })
        })
    }
}

export const initArticle = ()=> {
    return{
        type:ARTICLE_INIT
    }
}