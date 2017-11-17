import "babel-polyfill";

import "ts-helpers";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import { syncHistoryWithStore } from "react-router-redux";

import routes from "./store/routes";
import store from "./store/configure-store";

import "./styles/index.css";
import "./styles/index.less";

declare const __TEST__: boolean;

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
