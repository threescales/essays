import * as React from "react";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import { rootRoute } from "../routers";
import p from "app/components/progress/index";
import { renderRoutes } from "react-router-config";
export default history => <Router>{renderRoutes(rootRoute)}</Router>;
