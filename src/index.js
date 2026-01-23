import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DarkModeContextProvider } from './store/DarkModeContext';
import { WeatherContextProvider } from './store/WeatherContext';
import { SelectedLocationContext, SelectedLocationContextProvider } from './store/SelectedLocationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <WeatherContextProvider>
        <SelectedLocationContextProvider>
          <App />
        </SelectedLocationContextProvider>
     </WeatherContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
