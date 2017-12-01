import {
  LOGIN_USER_SUCCESS,
} from "../constants";

import { fromJS } from "immutable";
import { getCookie } from "../utils/cookie";
const INITIAL_STATE = fromJS({
  token: null,
  feedToken: null,
  user: undefined,
  hasError: false,
  isLoading: false,
  refreshToken: null
});

function sessionReducer(state:any = INITIAL_STATE,
  action:any = { type: "", data: null }) {
  switch (action.type) {

    case LOGIN_USER_SUCCESS:
      return state.merge(fromJS({
        user: action.data,
      }));
    default:
      return state;
  }
}

export default sessionReducer;
