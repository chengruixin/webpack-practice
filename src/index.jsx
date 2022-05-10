import React from 'react';
import ReactDom from 'react-dom/client';
import App from './app.jsx';

const root = ReactDom.createRoot(document.querySelector("#root"));
// root.render(<h1>asdf</h1>)
root.render(<App />)

