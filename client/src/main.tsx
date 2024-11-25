/// <reference types="vite/client" />
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import './styles/globals.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/auth/AuthContext.tsx';
import { Toaster } from 'react-hot-toast';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
createRoot(rootElement).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Toaster position="top-right" />
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
