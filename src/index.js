import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Fix for browser extensions that modify the DOM
const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.Fragment>
      <App />
    </React.Fragment>
  );
}
