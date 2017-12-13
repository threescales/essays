import {
    LOGIN_USER_SUCCESS,
    LOGIN_OUT
} from "../constants";
import { postAjax, getAjax } from '../utils/ajax'
import * as Paths from '../constants/path'
import { saveUserToStorage, getUserFromStorage, getCookie, delCookie, delUserFromStorage } from "../utils/cookie"
export const getUserSuccess = (data) => {
    return {
        type: LOGIN_USER_SUCCESS,
        data: data
    }
}
export const loginOut = () => {
    delUserFromStorage()
    delCookie('essays_rememberMe_token')
    delCookie('userId')
    return {
        type: LOGIN_OUT
    }
}
export const login = (account, password) => {
    return (dispatch: any, getState: Function) => {
        return postAjax(Paths.login,
            { account, password }).then((result: any) => {
                if (result.success) {
                    let data = result.data
                    data.accounts = result.accounts
                    dispatch(getUserSuccess(data))
                } else {
                    console.error("登录失败，账号或密码不正确")
                }
            }).error(res => {
                console.error('登录失败')
            })
    }
};

export const getUserById = () => {
    return (dispatch: any, getState: Function) => {
        let userId = getCookie("userId")
        // let user = getUserFromStorage()
        // if (user) {
        //     dispatch(getUserSuccess(user))
        //     return
        // }
        return getAjax(Paths.getUserById).then((result: any) => {
            if (result.success) {
                let data = result.data
                data.accounts = result.accounts
                dispatch(getUserSuccess(data))
            } else {
                console.error("登录失败，账号或密码不正确")
            }
        }).error(res => {
            console.error('查询失败')
        })
    }
}