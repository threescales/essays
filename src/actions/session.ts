import {
    LOGIN_USER_SUCCESS,
} from "../constants";
import { postAjax, getAjax } from '../utils/ajax'
import * as Paths from '../constants/path'

export const getUserSuccess = (data) => {
    return {
        type: LOGIN_USER_SUCCESS,
        data: data
    }
}

export const login = (email, password) => {
    return (dispatch: any, getState: Function) => {
        return postAjax(Paths.login,
            { email, password }).then((result:any) => {
                dispatch(getUserSuccess(result.data))
            }).error(res => {
                console.log('登录失败')
            })
    }
};

export const getUserById = () => {
    return (dispatch: any, getState: Function) => {
        return getAjax(Paths.getUserById).then((result:any) => {
            dispatch(getUserSuccess(result.data))            
        }).error(res => {
            console.log('查询失败')
        })
    }
}