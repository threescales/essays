import { putAjax, getAjax, postAjax } from '../utils/ajax'
import * as Path from '../constants/path'
import {
    GET_USER_INFO,
    PROFILE_INIT
} from '../constants/index'

export const getUserInfo = (userId) => {
    return (dispatch: any, getState: Function) => {
        return getAjax(Path.getUserInfo(userId)).then((result: any) => {
            let data = result.data
            dispatch({
                type: GET_USER_INFO,
                data: data
            })
        })
    }
}

export const initProfile = () => {
    return {
        type: PROFILE_INIT
    }
}