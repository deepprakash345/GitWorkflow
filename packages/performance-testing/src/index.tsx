import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// @ts-ignore
import Spectrum2Provider from '@react/react-spectrum/Provider';
import { Provider as Spectrum3Provider, defaultTheme } from '@adobe/react-spectrum'
ReactDOM.render(
  <React.StrictMode>
    <Spectrum2Provider>
      <Spectrum3Provider theme={defaultTheme}>
        <App />
      </Spectrum3Provider>
    </Spectrum2Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
