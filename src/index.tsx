import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'App';
import {Snake} from "components/snake/model/Snake"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const snake = new Snake()

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);