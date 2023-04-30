import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import routes from "./routes";

const EnterpriseRoutes = ({ rest }) => {
  const token = localStorage.getItem("token");
  const session = JSON.parse(localStorage.getItem("SESSION_INFO"));

  let location = useLocation();

  if (!token || !session) {
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  } else if (session.role[0] === 1) {
    return <Navigate to={routes.home} state={{ from: location }} replace />;
  }
  return <Outlet {...rest} />;
};

export default EnterpriseRoutes;
