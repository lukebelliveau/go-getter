import React from 'react';
import ReactDOM from 'react-dom';
// IE10 Promise compatibility
import Promise from 'promise-polyfill';
if (!window.Promise) window.Promise = Promise;

import App from './src/App';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
