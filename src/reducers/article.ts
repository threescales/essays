import {
    GET_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_BODY_SUCCESS,
    TOGGLE_ARITCLE_PUBLISH,
    UPDATA_ARTICLE_COUNT
} from '../constants'

import { fromJS, } from 'immutable'
const INITIAL_STATE = fromJS({})

function articleReducer(state: any = INITIAL_STATE, action: any = { type: "" }) {
    switch (action.type) {
        case GET_ARTICLE_SUCCESS:
            return state.merge(fromJS(action.data))
        case UPDATE_ARTICLE_BODY_SUCCESS:
            return state.merge(fromJS({ body: action.body }))
        case TOGGLE_ARITCLE_PUBLISH:
            return state.merge(fromJS({ isPublish: action.isPublish }))
        case UPDATA_ARTICLE_COUNT:
            return state.merge(fromJS({ likeNum: action.likeNum, readNum: action.readNum }))
        default:
            return state;
    }
}

export default articleReducer;