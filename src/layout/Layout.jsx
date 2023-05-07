import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  const [windowsWidth, setWindowsWidth] = useState(window.innerWidth);
  const [asideActive, setAsideActive] = useState(false);
  const [responsive, setResponsive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowsWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowsWidth < 960) {
      setResponsive(true);
    } else {
      setResponsive(false);
    }
  }, [windowsWidth]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar setAsideActive={setAsideActive} asideActive={asideActive} />
      </Grid>
      <Grid item xs={asideActive ? 3 : 0}>
        <Sidebar
          setAsideActive={setAsideActive}
          asideActive={asideActive}
          responsive={responsive}
        />
      </Grid>
      <Grid item xs={asideActive ? 9 : 12} sx={{ minHeight: "92vh", p: 5 }}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Layout;
