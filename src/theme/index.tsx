import { grey, green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: green[900],
    },
    background: { default: grey[200], paper: grey[500] },
  },
});

export default theme;
