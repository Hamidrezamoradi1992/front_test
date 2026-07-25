import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import cacheRtl from "./Theme/rtl";

import App from "./App";
import { store } from "./redux/store";

import "./index.css";

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
    primary: {
      main: "#7C3AED",
    },
    secondary: {
      main: "#2563EB",
    },
    background: {
      default: "#09090f",
      paper: "rgba(20,20,30,.85)",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,.7)",
    },
  },

  shape: {
    borderRadius: 16,
  },

  typography: {
    fontFamily: "Vazirmatn, sans-serif",
  },

  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  </StrictMode>,
);
