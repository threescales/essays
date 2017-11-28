import { combineReducers } from "redux";
import {routerReducer} from "react-router-redux";
import session from "./session";
import show from "./show"
import article from "./article"

const rootReducer = combineReducers<any>({
  session,
  routing: routerReducer,
  show,
  article
} as any);

export default rootReducer;