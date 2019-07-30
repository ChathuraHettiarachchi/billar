import React from 'react';
import ReactDOM from 'react-dom';
import Loader from 'react-loader-spinner';

import 'semantic-ui-css/semantic.min.css';
import './index.css'

import App from './App'

const rootElement = document.getElementById('root');
ReactDOM.render(
    <App/>,
    rootElement
);
