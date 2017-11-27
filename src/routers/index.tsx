import "babel-polyfill";

import "ts-helpers";

import Article from "../containers/article";
import Welcome from '../containers/welcome'
import toJS from "../utils/immutable-to-js";
import store from "../store/configure-store";

declare var require;

export const rootRoute = [
  {
    path: "/article/:articleId",
    component: Article,
  },
  {
    path: "/welcome",
    component: Welcome
  }
];