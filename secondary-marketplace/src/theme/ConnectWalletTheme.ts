import { createTheme } from '@mui/material';

export const connectWalletTheme = createTheme({
  typography: {
    fontFamily: 'Slate',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
          {
            display: 'none',
          },
          '& input[type=number]': {
            MozAppearance: 'textfield',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
              @font-face {
                font-family: "Slate";
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                text-transform: none;
                font-size: 16px;
              }
            `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Slate',
          textTransform: 'none',
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: '16px',
          backgroundColor: '#6563FD',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#6563FD',
            color: '#fff',
            opacity: 0.5,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: '1px solid #D7D8DB',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.08)',
          borderRadius: '4px',
        },
      },
    },
    MuiDivider: {
      variants: [
        {
          props: { orientation: 'horizontal' },
          style: {
            ':before': {
              borderTop: 'thin solid #D7D8DB',
            },
            ':after': {
              borderTop: 'thin solid #D7D8DB',
            },
          },
        },
      ],
    },
  },
  palette: {
    primary: {
      main: '#6563FD',
    },
    secondary: {
      main: '#A6FF00',
    },
    backgroundColor: {
      primary: '#ffffff',
      secondary: '#000000',
    },
    grey: {
      100: '#868b93',
      500: '#A1A5AB',
    },
    toastError: {
      500: '#CE2818',
    },
    iconColor: '#000000',
  },
});
