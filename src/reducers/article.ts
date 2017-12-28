import {
    GET_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_BODY_SUCCESS,
    TOGGLE_ARITCLE_PUBLISH,
    UPDATA_ARTICLE_COUNT,
    ARTICLE_INIT,
    POST_COMMENT_SUCCESS,
    GET_ALL_COMMENTS
} from '../constants'

import { fromJS, } from 'immutable'
const INITIAL_STATE = fromJS({
    article: null,
    author: null,
    comments: []
})

function articleReducer(state: any = INITIAL_STATE, action: any = { type: "" }) {
    let article = state.toJS().article
    switch (action.type) {
        case GET_ARTICLE_SUCCESS:
            return state.merge(fromJS({
                article: action.data.article,
                author: action.data.author,
            }))
        case UPDATE_ARTICLE_BODY_SUCCESS:
            article.body = action.body
            return state.merge(fromJS({
                article
            }))
        case TOGGLE_ARITCLE_PUBLISH:
            article.isPublished = action.isPublished
            return state.merge(fromJS({
                article
            }))
        case POST_COMMENT_SUCCESS:
            let comments = state.toJS().comments
            comments.push(action.data)
            return state.merge(fromJS({
                comments
            }))
        case GET_ALL_COMMENTS:
            return state.merge(fromJS({
                comments:action.data||[]
            }))
        case UPDATA_ARTICLE_COUNT:
            return state
        case ARTICLE_INIT:
            return INITIAL_STATE
        default:
            return state;
    }
}

export default articleReducer;