import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/login/Login'
import Home from './components/pages/Home'
import Layout from './components/Layout'

const Routes = () => {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
        </Layout>
    );
};

export default Routes;
