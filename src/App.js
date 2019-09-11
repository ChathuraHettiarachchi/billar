import React from 'react';
import Routes from './Routes';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from "./components/login/Login";
import Layout from "./components/Layout";

function App() {
    return (
        <>
            <Router>
                <Layout>
                    <Routes/>
                </Layout>
            </Router>
        </>
    );
}

export default App;
