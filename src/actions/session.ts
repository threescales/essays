import {
    LOGIN_USER_SUCCESS,
    LOGIN_OUT
} from "../constants";
import { postAjax, getAjax,putAjax } from '../utils/ajax'
import * as Paths from '../constants/path'
import toastr from 'utils/toastr'
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
                    dispatch(getUserSuccess(data))
                } else {
                    toastr.error('登录失败，请重新登录')
                }
                return result                
            }).error(res => {
            })
    }
};

export const signup = (email,password,name) => {
    return(dispatch:any,getState:Function) => {
        return putAjax(Paths.signup,{
            account:email,password,name
        }).then((result:any) => {
            if(result.success) {
                toastr.success('注册成功，请确认您的邮件完成注册')
            } else {
                toastr.error(result.message)
            }
        })
    }
}

export const getUserById = () => {
    return (dispatch: any, getState: Function) => {
        let userId = getCookie("userId")
        return getAjax(Paths.getUserById).then((result: any) => {
            if (result.success) {
                let data = result.data
                dispatch(getUserSuccess(data))
            }
            return result
        }).error(res => {
            return res
        })
    }
}

export const updateUser = (user) => {
    return (dispatch: any, getState: Function) => {
        let email = user.email
        let name = user.name
        let introduction = user.introduction

        return postAjax(Paths.updateUser, {
            email, name, introduction
        }).then((result: any) => {
            if (result.success) {
                let data = result.data
                dispatch(getUserSuccess(data))
            } else {
                toastr.error("修改信息失败")
            }
        })
    }
}

export const sendMail = (user) => {
    return (dispatch: any, getState: Function) => {
        let email = user.email
        let name = user.name
        let introduction = user.introduction
        return postAjax(Paths.updateUser, {
            email, name, introduction
        }).then((result: any) => {
            if (result.success) {
                postAjax(Paths.sendEmail, { userId: user.id, type: 'email' }).then((res: any) => {
                    if (res.success) {
                        toastr.success("发送邮件成功")
                    }
                })
                let data = result.data
                dispatch(getUserSuccess(data))
            } else {
                toastr.error("发送失败，请重新发送")
            }
        })
    }
}