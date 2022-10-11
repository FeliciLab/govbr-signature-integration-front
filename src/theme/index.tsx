import { green, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: green[700],
    },
    background: { default: '#CACACA', paper: '#fff' },
  },
});

export default theme;
