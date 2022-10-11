import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UserInfoProvider from './context/User';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserInfoProvider>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </UserInfoProvider>
  </React.StrictMode>
);
