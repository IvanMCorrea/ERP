import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../../router/routes";

const Sidebar = ({ responsive, asideActive }) => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [nav, setNav] = useState([]);
  const data = localStorage.getItem("USER_INFO");

  useEffect(() => {
    const info = JSON.parse(data);

    if (!info) {
      navigate(routes.login);
    } else {
      setId(info._id);
      if (info.role[0] === 0) {
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
            options: [
              { name: "Users", id: 21, link: "#" },
            ],
          },
          {
            id: 3,
            name: "Clients",
            options: [
              { name: "Clients", id: 31, link: "#" },
            ],
          },
        ]);
      } else if (info.role[0] === 1) {
        setNav([
          {
            id: 10,
            name: 'User',
            options: [
              { name: 'Home', id: 101, link: "#" },
              { name: "My profile", id: 100, link: "#" }
            ],
          },
        ]);
      }
    }
  }, [data, id]);

  return (
    <Grid container className="drawer" sx={{
      position: 'fixed', width: responsive ? '100vw' : '20vw', height: '100vh', zIndex: 1100, opacity: 1, top: 0,
      left: asideActive ? 0 : '-100vw', backgroundColor: 'primary.main',
      transition: 'all 0.5s ease-in-out',
    }}>
      <Grid item xs={12} sx={{ margin: 1 }}>
      </Grid>
    </Grid>
  );
};

export default Sidebar;