import {
    SHOW,
    HIDE,
    SHOW_INIT
} from "../constants";

export const show = (key: string) => ({
    type: SHOW,
    something: key
})

export const hide = (key: string) => ({
    type: HIDE,
    something: key
})

export const initShow = () => ({
    type: SHOW_INIT
})