import {
    CREATE_ARTICLE_SUCCESS,
} from "../constants";
import { putAjax } from '../utils/ajax'

export const createArticle = (title, description, cover, tag) => {
    return (dispatch: any, getState: Function) => {
        return putAjax('/api/article', {
            title, description, cover, tag
        }).then((result: any) => {
            window.location.href = `/article/${result.data._id}`
        })
    };
};