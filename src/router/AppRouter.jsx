import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Login from "../pages/Login";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Register from "../pages/Register";

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path={routes.login} element={<Login />} />
      <Route exact path={routes.register} element={<Register />} />
      <Route element={<Layout />}>
        <Route exact path={routes.dashboard} element={<Home />} />
      </Route>
      <Route path={"/*"} element={<Navigate to={routes.login} />} />
    </Routes>
  );
};

export default AppRouter;
