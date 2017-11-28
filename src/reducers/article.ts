import {GET_ARTICLE_SUCCESS} from '../constants'

import { fromJS } from 'immutable'
const INITIAL_STATE = fromJS({})

function articleReducer(state:any = INITIAL_STATE,action:any={type:""}) {
    switch (action.type) {
        case GET_ARTICLE_SUCCESS:
            return state.merge(fromJS(action.data))
        default:
            return state;
    }
}

export default articleReducer;