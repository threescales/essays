import {
    SHOW,
    HIDE
} from "../constants";

export const show = (key) => ({
    type: SHOW,
    something: key
})

export const hide = (key) => ({
    type: HIDE,
    something: key
})