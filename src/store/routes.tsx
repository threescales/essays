import * as React from "react";
import { Route, Router } from "react-router";
import { rootRoute } from "../routers";
import p from "app/components/progress/index";
import { renderRoutes } from "react-router-config";
export default history => (
  <Router history={history}>
    {renderRoutes(rootRoute)}
  </Router>
);
