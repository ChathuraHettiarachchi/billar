// src/components/BillarNavigationNavigation.js

import React from "react";
import {useAuth0} from "../react-auth0-wrapper";

import Routes from '../Routes';
import {BrowserRouter as Router} from 'react-router-dom';
import Layout from "../components/Layout";
import Login from "./login/Login";

const BillarNavigation = () => {
    const {isAuthenticated, loginWithRedirect, logout} = useAuth0();

    return (
        <div>
            {!isAuthenticated && (
                loginWithRedirect({})
            )}

            {isAuthenticated && (
                <Router>
                    <Layout>
                        <Routes/>
                    </Layout>
                </Router>
            )}
        </div>
    );
};

export default BillarNavigation;