import React from 'react';
import Routes from './Routes';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from "./components/login/Login";

function App() {
    return (
        <>
            <Router>
                <Routes/>
            </Router>
        </>
    );
}

export default App;
