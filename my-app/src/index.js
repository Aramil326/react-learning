import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const text = 'Hello, world';

const elem = (
  <div>
    <h2>{text}</h2>
    <input type="text" />
    <button />
  </div>
);

ReactDOM.render(
  elem,
  document.getElementById('root')
);
