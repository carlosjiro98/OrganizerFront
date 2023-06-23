import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';

//Comunicacion con azure
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './helpers/authConfig';

// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';

//Router dom
import { BrowserRouter } from 'react-router-dom';

const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
 */
root.render(
    <React.StrictMode>
        <MsalProvider instance={msalInstance}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MsalProvider>
    </React.StrictMode>
);