import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { setupAxiosInterceptors } from './config/setupAxios';
import './global.css';

setupAxiosInterceptors();

export const enableMSW = async () => {
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MSW) {
    const { worker } = await import('@/mocks/browser');
    await worker.start({});
  }
};

enableMSW().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
