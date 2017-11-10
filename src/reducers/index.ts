import { combineReducers } from "redux";
import {routerReducer} from "react-router-redux";
import session from "./session";

const rootReducer = combineReducers<any>({
  session,
  routing: routerReducer
} as any);

export default rootReducer;