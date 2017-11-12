import "babel-polyfill";

import "ts-helpers";

import App from "../containers/app";
import toJS from "../utils/immutable-to-js";
import store from "../store/configure-store";
declare var require;

export const rootRoute = [
  {
    path: "/",
    component: App,
  },
];