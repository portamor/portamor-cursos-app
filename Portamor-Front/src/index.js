import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // importa Provider de react-redux
import store from './Store/index'; // importa tu store de Redux aquí
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* envuelve tu componente App en Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();