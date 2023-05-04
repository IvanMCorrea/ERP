import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ColorModeContext } from "../theme/AppTheme";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import routes from "../router/routes";
import { useSnackbar } from "notistack";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const theme = useContext(ColorModeContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.status) {
      enqueueSnackbar(res.msg, { variant: "success" });
      navigate(routes.dashboard);
    } else {
      enqueueSnackbar(res.msg, { variant: "error" });
    }
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <IconButton
        sx={{ position: "fixed", right: "2rem", top: "1rem" }}
        onClick={theme.toggleColorMode}
        color="inherit"
      >
        {theme.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      <Grid
        item
        xs={11}
        md={6}
        lg={4}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Card component="article" sx={{ maxWidth: "500px", minHeight: 350 }}>
          <CardContent
            sx={{
              textAlign: "center",
              py: 5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Sign in
            </Typography>
            <form onSubmit={handleSubmit}>
              <Typography>Email</Typography>
              <TextField
                sx={{ my: 2, px: 5 }}
                fullWidth
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography>Password</Typography>
              <TextField
                sx={{ my: 2, px: 5 }}
                fullWidth
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="contained" type="submit">
                Login
              </Button>
            </form>
            <Link to={routes.register} style={{ marginTop: 20 }}>
              Create account
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
