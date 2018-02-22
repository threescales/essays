import * as Koa from "koa";
import json = require("koa-json");
import compress = require("koa-compress");
import logger = require("koa-logger");
import staticServer = require("koa-static");
import * as path from "path";
import routerFactory from "./router";
import http = require("http");
import helmet = require("koa-helmet");
const koaBody = require("koa-body");
import config = require("config");
import logMiddleWare from "./middlewares/logger";
import { updateCSRFToken, CSRFSettings } from "./middlewares/csrf";
import sessionSettings from "./middlewares/session";
import koaViews = require("koa-views");
import session = require("koa-session");
import limit = require("koa-limit");
// var cors = require("koa-cors");

import { read } from "fs";

const app = new Koa();
const router = routerFactory();
app.keys = ["a", "b"];

app.use(function*(next) {
  try {
    yield next;
  } catch (err) {
    console.log(err.stack);
    this.throw(err.status || 500, JSON.stringify({ errMsg: err.message }));
  }
});

// tslint:disable-next-line:jsdoc-format
/**  use middleware*/

app.use(helmet());
app.use(logger());
app.use(
  limit({
    limit: 10,
    interval: 1000 * 5
  })
);
/**
 * Add session support
 */
app.use(session(sessionSettings, app));

app.use(koaBody());
/**
 *  Add the CSRF middleware
 */
app.use(updateCSRFToken);

/**
 * Views
 */

// koa-views Must be used before any router is used
app.use(koaViews(__dirname + "/app/views", { extension: "pug" }));

app.use(compress());
app.use(json());
app.use(router.routes());

app.use(staticServer(__dirname + "./../../public", {}));

//Hooks
app.on("error", function(err) {
  this.status = 200;
  this.body = {
    message: err.message
  };
});
console.log(__dirname);
export = app;
