import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Components/AuthComponent/AuthContext';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './Components/ThemeComponent/ThemeComponent';
import { ClerkProvider } from '@clerk/clerk-react';

const CLERK_PUBLISHABLE_KEY="pk_test_ZGFzaGluZy10YWhyLTU1LmNsZXJrLmFjY291bnRzLmRldiQ";
const CLERK_SECRET_KEY="sk_test_cZtKRsP6g1caTWdm4gRPQR6h8N81luxCBSsky9e1yA";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider  publishableKey={CLERK_PUBLISHABLE_KEY}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
       <App/>
      </ThemeProvider>
    </AuthProvider>
    </ClerkProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
