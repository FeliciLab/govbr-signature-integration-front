import { grey, green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: green[700],
    },
    background: { default: grey[200], paper: grey[300] },
  },
});

export default theme;
