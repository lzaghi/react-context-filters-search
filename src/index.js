import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NameProvider from './context/NameProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <NameProvider>
      <App />
    </NameProvider>,
  );
