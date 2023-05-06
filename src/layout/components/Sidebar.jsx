import React, { useEffect, useState } from "react";
import { Accordion, AccordionSummary, Grid, AccordionDetails, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../router/routes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  }, []);

  return (
    <Grid
      container
      sx={{
        position: "relative",
        width: responsive ? "100vw" : "100%",
        height: asideActive ? "92vh" : 0,
        opacity: 1,
        top: 0,
        left: asideActive ? 0 : "-30vw",
        transition: "left 0.5s ease-in-out",
        backgroundColor: "sidebar"
      }}
    >
      <Grid item xs={12} >
      {nav &&
        nav.map((item) => (
          <Accordion key={item.id} sx={{backgroundColor: "sidebar"}} disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
            >
              <Typography>{item.name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              {item.options &&
                item.options.map((option) => (
                  <Button
                    component={Link}
                    to={option.link}
                    key={option.id}
                    variant="contained"
                    sx={{
                      py: 2,
                      borderBottom: "1px solid #222222",
                      textAlign: "center",
                    }}
                    fullWidth
                  >
                    {option.name}
                  </Button>
                ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  );
};

export default Sidebar;
