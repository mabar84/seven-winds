import React from 'react';
import ReactDOM from 'react-dom/client';

import {withProviders} from "./providers";
import {App} from "./App";

import './styles/index.scss';

export const AppWithProviders = withProviders(App);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppWithProviders />
    </React.StrictMode>
);
