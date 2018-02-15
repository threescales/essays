import * as React from "react";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import { rootRoute } from "../routers";
import { renderRoutes } from "react-router-config";
import ScrollToTop from "../routers/components/scrollToTop";
export default history => (
  <Router>
    <ScrollToTop>{renderRoutes(rootRoute)}</ScrollToTop>
  </Router>
);
