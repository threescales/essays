import {
    CREATE_ARTICLE_SUCCESS,
} from "../constants";
import { putAjax, getAjax } from '../utils/ajax'
import * as Path from '../constants/path'
import {GET_ARTICLE_SUCCESS} from '../constants/index'
export const createArticle = (title, description, cover, tag) => {
    return (dispatch: any, getState: Function) => {
        return putAjax(Path.putArticle, {
            title, description, cover, tag
        }).then((result: any) => {
            window.location.href = `/articles/${result.data._id}`
        })
    };
};

export const getArticleById = (id: string) => {
    return (dispatch: any, getState: Function) => {
        return getAjax(Path.getArticle(id), {
        }).then((result: any) => {
            dispatch({
                type:GET_ARTICLE_SUCCESS,
                data:result.data
            })
        })
    }
}