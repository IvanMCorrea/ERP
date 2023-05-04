import React from "react";
import ReactDOM from "react-dom/client";
import AppTheme from "./theme/AppTheme.jsx";
import "./assets/css/main.css";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider
      autoHideDuration={1500}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <AppTheme />
    </SnackbarProvider>
  </React.StrictMode>
);
