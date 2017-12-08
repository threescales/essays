import "babel-polyfill";

import "ts-helpers";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import { syncHistoryWithStore } from "react-router-redux";

import './utils/ajax'

import routes from "./store/routes";
import store from "./store/configure-store";

import "./styles/index.less";

declare const __TEST__: boolean;
declare const __DEV__: boolean;

const history = syncHistoryWithStore(createBrowserHistory(),store);
if (!__TEST__) {
  ReactDOM.render(
    <div>
      <Provider store={ store }>
        { routes(history) }
      </Provider>
    </div>,
    document.getElementById("root")
  );
}

if (!__DEV__) {
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?282b8bcdb026b98f041a9fc2703d182a";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();
}