import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Buffer } from 'buffer';
import process from 'process';
import { WalletProvider } from './context/WalletContext.tsx';

window.Buffer = Buffer;
window.process = process;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </StrictMode>,
);
