import { putAjax, getAjax, postAjax } from '../utils/ajax'
import * as Path from '../constants/path'
import { CREATE_ARTICLE_SUCCESS,GET_ARTICLE_SUCCESS,UPDATE_ARTICLE_BODY_SUCCESS } from '../constants/index'
import { EditorState, convertToRaw } from 'draft-js'
import { RawDraftContentState } from 'draft-js'

export const getArticleSuccess = (data) => {
    return {
        type: GET_ARTICLE_SUCCESS,
        data
    }
}

export const createArticle = (userId,title, description, cover, tag) => {
    return (dispatch: any, getState: Function) => {
        let editorState = EditorState.createEmpty()
        let body = JSON.stringify(convertToRaw(editorState.getCurrentContent()))

        return putAjax(Path.putArticle, {
            userId, title, description, cover, tag, body
        }).then((result: any) => {
            window.location.href = `/articles/${result.data._id}`
        })
    };
};

export const getArticleById = (id: string) => {
    return (dispatch: any, getState: Function) => {
        return getAjax(Path.getArticle(id), {
        }).then((result: any) => {
            dispatch(getArticleSuccess(result.data))
        })
    }
}

export const saveArticleBody = (id: string, contentState: RawDraftContentState) => {
    let body= JSON.stringify(contentState)
    return (dispatch: any, getState: Function) => {
        return postAjax(Path.saveArticleBody, {
            id, body
        }).then((result: any) => {
            dispatch({
                type:UPDATE_ARTICLE_BODY_SUCCESS,
                body
            })
        })
    }
}