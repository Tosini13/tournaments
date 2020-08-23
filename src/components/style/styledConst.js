import { createMuiTheme } from "@material-ui/core/styles";

export const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#173d75",
      light: "#0071bc",
    },
    secondary: {
      main: "#f58220",
      light: "white",
    },
    error: {
      main: "#eb5757",
    },
    warning: {
      main: "#f2c94c",
    },
    success: {
      main: "#219653",
    },
    info: {
      main: "#858585",
    },
  },
});
