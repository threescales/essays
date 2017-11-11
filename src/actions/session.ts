import {
    LOGIN_USER_SUCCESS,
} from "../constants";

export const login = (token: string) => {
    return (dispatch: any, getState: Function) => {
        return dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: {
                token
            }
        });
    };
};