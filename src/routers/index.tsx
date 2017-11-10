import "babel-polyfill";

import "ts-helpers";

import App from "../containers/app";
import toJS from "../utils/immutable-to-js";
import store from "../store/configure-store";

export const rootRoute = [{
  path: "/",
  component: App,
  indexRoute: {
    onEnter: (nextState, replace) => {
      const jsStore = toJS(store.getState()) as any;
      replace(`/welcome`);
    }
  }
}];