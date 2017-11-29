import "babel-polyfill";

import "ts-helpers";

import Article from "../containers/article";
import Index from "../containers/home"
import toJS from "../utils/immutable-to-js";
import store from "../store/configure-store";
import * as Path from '../constants/path'

declare var require;

export const rootRoute = [
  {
    path: Path.articlePage,
    component: Article,
  },
  {
    path: Path.indexPage,
    component: Index
  }
];