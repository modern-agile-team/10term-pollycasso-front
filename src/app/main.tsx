import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/shared/styles/global.css';
import App from './App';

if (import.meta.env.DEV) {
  const { worker } = await import('@/mocks/browser');
  await worker.start();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
