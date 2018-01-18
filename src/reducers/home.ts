import { fromJS } from "immutable";
import * as Constants from "../constants/homeConstants";
const INITIAL_STATE = fromJS({
  articles: []
});

function showReducer(state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    case Constants.GET_ARTICLES:
      return state.merge(
        fromJS({
          articles: action.articles
        })
      );
    default:
      return state;
  }
}

export default showReducer;
