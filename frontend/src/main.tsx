// main.tsx — entry point. Configures Amplify (no-op in mock mode), mounts the
// app, and wraps it in the Theme / Toast / Auth providers.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { configureAmplify } from './config/amplify';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './styles/globals.css';

configureAmplify();

const container = document.getElementById('app');
if (!container) throw new Error('Root element #app not found');

createRoot(container).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
