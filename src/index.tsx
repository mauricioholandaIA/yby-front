import { green, purple } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: green[500],
    },
  },

  typography: {
    fontFamily: "Manrope",
  },

  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          "& label.Mui-focused": {
            color: "#A0AAB4",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#B2BAC2",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#E0E3E7",
            },
            "&:hover fieldset": {
              borderColor: "#B2BAC2",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#6F7E8C",
            },
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
