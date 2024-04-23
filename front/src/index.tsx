import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules';

import CssBaseline from '@mui/material/CssBaseline';

import App from './App';

import '@fontsource/roboto/400.css';
import './assets/css/index.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const store = configureStore({ reducer: rootReducer });

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <CssBaseline />
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
