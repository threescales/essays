import {
    GET_USER_INFO,
    USER_INIT
} from '../constants/index'

import { fromJS, } from 'immutable'
const INITIAL_STATE = fromJS({})

function userReducer(state: any = INITIAL_STATE, action: any = { type: "" }) {
    switch (action.type) {
        case GET_USER_INFO:
            return state.merge(fromJS(action.data))
        case USER_INIT:
            return INITIAL_STATE;
        default:
            return state
    }
}

export default userReducer;