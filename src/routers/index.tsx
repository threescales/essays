import "babel-polyfill";

import "ts-helpers";

import Article from "../containers/article";
import Index from "../containers/home"
import Login from '../containers/login'
import MyArticles from '../containers/myarticles'
import toJS from "../utils/immutable-to-js";
import store from "../store/configure-store";
import * as Paths from '../constants/path'

declare var require;

export const rootRoute = [
  {
    path: Paths.articlePage,
    component: Article,
  },
  {
    path: Paths.loginPage,
    component:Login
  },
  {
    path:Paths.myartilcesPage,
    component:MyArticles
  },
  {
    path: Paths.indexPage,
    component: Index
  }
];