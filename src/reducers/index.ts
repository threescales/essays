import { combineReducers } from "redux";
import {routerReducer} from "react-router-redux";
import session from "./session";
import show from "./show"

const rootReducer = combineReducers<any>({
  session,
  routing: routerReducer,
  show,
} as any);

export default rootReducer;