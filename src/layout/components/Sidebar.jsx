import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../router/routes";

const Sidebar = ({ responsive, asideActive }) => {
  const navigate = useNavigate();
  const [nav, setNav] = useState([]);
  const info = JSON.parse(localStorage.getItem("USER_INFO"));
  const role = JSON.parse(localStorage.getItem("ROLE"));
  useEffect(() => {
    if (!info) {
      navigate(routes.login);
    } else {
      if (role === 0) {
        setNav([
          {
            id: 1,
            name: "Enterprise",
            options: [
              { name: "Dashboard", id: 11, link: routes.home },
              { name: "Settings", id: 12, link: "#" },
            ],
          },
          {
            id: 2,
            name: "Users",
            options: [{ name: "Users", id: 21, link: "#" }],
          },
          {
            id: 3,
            name: "Clients",
            options: [{ name: "Clients", id: 31, link: "#" }],
          },
        ]);
      } else if (role === 1) {
        setNav([
          {
            id: 10,
            name: "User",
            options: [
              { name: "Home", id: 101, link: "#" },
              { name: "My profile", id: 100, link: "#" },
            ],
          },
        ]);
      }
    }
  }, [info]);

  return (
    <Grid
      container
      className="drawer"
      sx={{
        position: "relative",
        width: responsive ? "100vw" : "20vw",
        height: "92vh",
        opacity: 1,
        top: 0,
        left: asideActive ? 0 : "-100vw",
        backgroundColor: "primary.main",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <Grid item xs={12} sx={{ margin: 1 }}></Grid>
    </Grid>
  );
};

export default Sidebar;
