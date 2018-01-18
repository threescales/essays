import { createStore, applyMiddleware, compose, Middleware } from "redux";
import { fromJS } from "immutable";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import { preloadSession } from "./preloadSession";
const persistState = require("redux-localstorage");

import promiseMiddleware from "../middlewares/promise-middleware";
import logger from "./logger";
import rootReducer from "../reducers";
import { getCookie } from "../utils/cookie";
declare const __DEV__: boolean; // from webpack

export function configureStore(initialState: any) {
  const myStore = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(..._getMiddleware()),
      persistState("session", _getStorageConfig()),
      __DEV__ && environment.devToolsExtension
        ? environment.devToolsExtension()
        : f => f
    )
  );

  _enableHotLoader(myStore);
  return myStore;
}

export function _getMiddleware(): Middleware[] {
  let middleware = [
    routerMiddleware(createBrowserHistory as any),
    promiseMiddleware,
    thunk
  ];

  if (__DEV__) {
    middleware = [...middleware, logger];
  }

  return middleware;
}

const environment: any = window || this;

function _enableHotLoader(myStore: any) {
  if (!__DEV__) {
    return;
  }

  const { hot } = module as any;
  if (hot) {
    hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers");
      myStore.replaceReducer(nextRootReducer);
    });
  }
}

function _getStorageConfig() {
  return {
    key: "jigloo-session",
    serialize: myStore => {
      myStore.session = myStore.session.set("isLoading", false);
      myStore.session = myStore.session.set("hasError", false);
      return myStore && myStore.session
        ? JSON.stringify(myStore.session.toJS())
        : myStore;
    },
    deserialize: state => {
      const data = JSON.parse(state);

      if (data && data.token && data.refreshToken) {
        return {
          session: fromJS(data)
        };
      }
    }
  };
}

const store = configureStore({
  session: fromJS(preloadSession())
});

export const getToken = () => {
  const s = store.getState();
  return s.session.getIn(["token"]);
};
export default store;

export const dispatch = store.dispatch;
