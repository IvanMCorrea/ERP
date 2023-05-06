import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import routes from "../../router/routes";
import { useNavigate } from "react-router-dom";
import { Brightness4, Brightness7, East, West } from "@mui/icons-material";
import { ColorModeContext } from "../../theme/AppTheme";
import { Tooltip } from "@mui/material";

const NavBar = ({ setAsideActive, asideActive }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const storageData = localStorage.getItem("USER_INFO");
  const user = JSON.parse(storageData);
  const theme = useContext(ColorModeContext);
  const navigate = useNavigate();

  const myMenu = [
    { label: "Profile", link: routes.dashboard },
    { label: "Logout" },
  ];

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(routes.login);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {myMenu.map((data, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            data.link ? navigate(data.link) : handleLogout();
          }}
        >
          {data.label}
        </MenuItem>
      ))}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <AppBar
        position={"static"}
        sx={{ height: "8vh", justifyContent: "center" }}
      >
        <Toolbar>
          <Tooltip placement="bottom" title={asideActive ? "Close menu" : "Open menu"}>
            <IconButton
              onClick={() => setAsideActive(!asideActive)}
              sx={{
                color: "white",
                mr: 5
              }}
            >
              {asideActive ? <West sx={{ fontSize: 30 }}  /> : <East sx={{ fontSize: 30 }}  />}
            </IconButton>
          </Tooltip>
          <Typography
            variant="h3"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {user && user.name ? user.name : "Empresa"}
          </Typography>

          

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip placement="bottom" title={theme.mode === "dark" ? "Light mode" : "Dark Mode"}>
              <IconButton
                size="large"
                onClick={theme.toggleColorMode}
                color="inherit"
              >
                {theme.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
            <Tooltip placement="bottom" title="Profile menu">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
export default NavBar;
