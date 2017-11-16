import "babel-polyfill";

import "ts-helpers";

import Write from "../containers/write";
import Welcome from '../containers/welcom'
import toJS from "../utils/immutable-to-js";
import store from "../store/configure-store";
declare var require;

export const rootRoute = [
  {
    path: "/write",
    component: Write,
  },
  {
    path: '/welcome',
    component: Welcome
  }
];