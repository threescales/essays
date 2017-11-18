import {
    SHOW,
    HIDE
} from "../constants";

import { fromJS } from "immutable";
import { getCookie } from "../utils/cookie";
const INITIAL_STATE = fromJS({
    a: false
});

function showReducer(state: any = INITIAL_STATE,
    action: any = { type: "", something: null }) {

    switch (action.type) {
        case SHOW:
            return state.merge(fromJS({
                [action.something]: true,
            }));
        case HIDE:
            return state.merge(fromJS({
                [action.something]: false
            }))
        default:
            return state;
    }
}

export default showReducer;