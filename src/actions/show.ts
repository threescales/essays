import {
    SHOW,
    HIDE
} from "../constants";

export const show = (key: string) => ({
    type: SHOW,
    something: key
})

export const hide = (key: string) => ({
    type: HIDE,
    something: key
})