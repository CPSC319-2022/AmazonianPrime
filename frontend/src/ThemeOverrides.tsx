import { createTheme } from '@mui/material/styles';
  
  const Theme = createTheme({      
    typography: {
      button: {
        textTransform: 'none'
      }
    },
    palette: {
        primary: {
            // Navy
            main:"#252E3D",
          },
          secondary: {
            // Orange
            main: '#FF9900',
          },
      },
  });

  export default Theme;