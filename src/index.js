import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyle } from 'components/GlobalStyle/GlobalStyle';
import { App } from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
