import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ColorModeContext } from "../theme/AppTheme";
import {
  Brightness4,
  Brightness7,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { login, register } from "../api/auth";
import { Link } from "react-router-dom";
import routes from "../router/routes";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    description: "",
    address: "",
  });

  const theme = useContext(ColorModeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    if (!form.name || !form.email || !form.password) return false;
    const res = await register(form);
    if (res.status) {
      alert("Logeado");
    } else {
      alert("error al iniciar sesión");
    }
  };

  const updateForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const inputs = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
    {
      name: "password",
      label: "Password",
      type: showPassword ? "text" : "password",
    },
    { name: "description", label: "Description", type: "text" },
    { name: "address", label: "Address", type: "text" },
  ];

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
        md={8}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Card
          component="article"
          sx={{ width: "100%", maxWidth: "1000px", minHeight: 800 }}
        >
          <CardContent
            sx={{
              textAlign: "center",
              py: 5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
              Register
            </Typography>
            <form onSubmit={handleSubmit}>
              {inputs.map((item) => (
                <FormControl fullWidth sx={{ px: 5 }} key={item.name}>
                  <Typography sx={{ textAlign: "left" }}>
                    {item.label}
                  </Typography>
                  <TextField
                    sx={{ my: 2 }}
                    fullWidth
                    name={item.name}
                    value={form[item.name]}
                    onChange={(e) => updateForm(e)}
                    type={item.type}
                    InputProps={{
                      endAdornment:
                        item.type === "password" ? (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                              sx={{ color: "#323232" }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ) : null,
                    }}
                  />
                </FormControl>
              ))}
              <Button variant="contained" type="submit">
                Create account
              </Button>
            </form>
            <Link to={routes.login} style={{ marginTop: 20 }}>
              Already have an account? Sign in
            </Link>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Register;
