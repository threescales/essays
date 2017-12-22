import {
    GET_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_BODY_SUCCESS,
    TOGGLE_ARITCLE_PUBLISH,
    UPDATA_ARTICLE_COUNT,
    ARTICLE_INIT
} from '../constants'

import { fromJS, } from 'immutable'
const INITIAL_STATE = fromJS({
    article:null,
    author:null,
})

function articleReducer(state: any = INITIAL_STATE, action: any = { type: "" }) {
    let article = state.toJS().article    
    switch (action.type) {
        case GET_ARTICLE_SUCCESS:
            return state.merge(fromJS({
                article:action.data.article,
                author:action.data.author
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
        case UPDATA_ARTICLE_COUNT:
            return state
        case ARTICLE_INIT:
            return INITIAL_STATE
        default:
            return state;
    }
}

export default articleReducer;