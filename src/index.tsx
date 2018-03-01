import "@babel/polyfill";

import "ts-helpers";

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import history1 from "./utils/history";
import "./utils/ajax";

import routes from "./store/routes";
import store from "./store/configure-store";

import "./styles/index.less";

declare const __TEST__: boolean;
declare const __DEV__: boolean;

const history = syncHistoryWithStore(history1, store);
if (!__TEST__) {
  ReactDOM.render(
    <div>
      <Provider store={store}>{routes(history)}</Provider>
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
if (!!navigator.serviceWorker) {
  (function() {
    navigator.serviceWorker
      .register("sw.js")
      .then(function(registration) {
        console.log("service worker register success");
      })
      .catch(function(err) {
        console.log("service worker register faild");
      });
  })();
}

// 判断是否支持webp格式
// (function(doc) {
//   // 给html根节点加上webps类名
//   function addRootTag() {
//     doc["SUPPORT_WEBP"] = true;
//   }

//   // 判断是否有webp_showjoy=available这个cookie
//   if (!/webp_showjoy=available/.test(document.cookie)) {
//     var image = new Image();

//     // 图片加载完成时候的操作
//     image.onload = function() {
//       // 图片加载成功且宽度为1，那么就代表支持webp了，因为这张base64图是webp格式。如果不支持会触发image.error方法
//       if (image.width == 1) {
//         // html根节点添加class，并且埋入cookie
//         addRootTag();
//         document.cookie = "webp_showjoy=available; max-age=31536000; domain=";
//       }
//     };

//     // 一张支持alpha透明度的webp的图片，使用base64编码
//     image.src =
//       "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==";
//   } else {
//     addRootTag();
//   }
// })(document);
