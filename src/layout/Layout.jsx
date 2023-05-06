import { Grid } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  const [asideActive, setAsideActive] = useState(false);
  return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar setAsideActive={setAsideActive} asideActive={asideActive} />
      </Grid>
      <Grid item xs={ asideActive ? 3 : 0}>
        <Sidebar setAsideActive={setAsideActive} asideActive={asideActive} />
      </Grid>
      <Grid item xs={asideActive ? 9 : 12} sx={{minHeight: "92vh",}}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
