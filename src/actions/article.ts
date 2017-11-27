import {
    CREATE_ARTICLE_SUCCESS,
} from "../constants";
import { putAjax } from '../utils/ajax'

export const createArticle = (title, description, cover, tag) => {
    return (dispatch: any, getState: Function) => {
        return putAjax('/api/article', {
            title, description, cover, tag
        }).then((response: any) => {
            window.location.href = `/article/${response.result._id}`
        })
    };
};