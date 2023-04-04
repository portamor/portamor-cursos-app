import App          from './App';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux'; 
import React        from 'react';
import store        from './Store/index'; 
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();