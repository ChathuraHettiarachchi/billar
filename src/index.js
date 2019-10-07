import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';
import './index.css'

import App from './App'
import {Auth0Provider} from "./react-auth0-wrapper";
import config from "./auth_config.json";
import * as serviceWorker from "./serviceWorker";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

const rootElement = document.getElementById('root');
ReactDOM.render(
    <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}>
        <App/>
    </Auth0Provider>,
    rootElement
);

serviceWorker.unregister();