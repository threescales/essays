import "babel-polyfill";

import "ts-helpers";

import Article from "../containers/article";
import Index from "../containers/home";
import Login from "../containers/login";
import MyArticles from "../containers/myarticles";
import Account from "../containers/account";
import toJS from "../utils/immutable-to-js";
import * as Paths from "../constants/path";
import { requireLogin } from "../utils/requireLogin";

declare var require;

export const rootRoute = [
  {
    path: Paths.articlePage,
    component: Article
  },
  {
    path: Paths.loginPage,
    component: Login
  },
  {
    path: Paths.myarticlesPage,
    component: MyArticles
  },
  {
    path: Paths.accountPage,
    component: Account
  },
  {
    path: Paths.indexPage,
    component: Index
  }
];
