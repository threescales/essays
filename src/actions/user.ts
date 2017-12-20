import { putAjax, getAjax, postAjax } from '../utils/ajax'
import * as Path from '../constants/path'
import {
    GET_USER_INFO,
    USER_INIT
} from '../constants/index'

export const getUserInfo = (userId) => {
    return (dispatch: any, getState: Function) => {
        return getAjax(Path.getUserInfo(userId)).then((result: any) => {
            let user = result.data
            let accounts = result.accounts
            dispatch({
                type: GET_USER_INFO,
                data: user
            })
        })
    }
}

export const initUser = () => {
    return {
        type: USER_INIT
    }
}