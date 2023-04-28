import { Paper, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { createContext, useState } from "react";
import AppRouter from "../router/AppRouter";
import { HashRouter } from "react-router-dom";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function AppTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');
  const colorMode = {
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
    mode: mode
  };

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            card: "#121212",
            text: {
              primary: '#111111',
              secondary: '#fff',
            },
          }
        : {
            card: "#121212",
            text: {
              primary: '#fff',
              secondary: '#fff',
            },
          }),
    },
    components: {
      ...(mode === 'light'
        ? {MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: "#f5f5f5",
              },
            },
          }
        }
        : {MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: "#121212",
            },
          },
          }
        })
    }
  })

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Paper>
          <HashRouter>
            <AppRouter/>
          </HashRouter>
        </Paper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}