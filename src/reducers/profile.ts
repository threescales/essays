import { GET_USER_INFO, PROFILE_INIT } from "../constants/index";

import { fromJS } from "immutable";
const INITIAL_STATE = fromJS({
  user: null
});

function profileReducer(
  state: any = INITIAL_STATE,
  action: any = { type: "" }
) {
  switch (action.type) {
    case GET_USER_INFO:
      return state.merge(
        fromJS({
          user: action.data
        })
      );
    case PROFILE_INIT:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default profileReducer;
