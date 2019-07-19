import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/login/Login'
import Layout from './components/Layout'

const Routes = () => {
    return (
        <Layout>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
        </Layout>
    );
};

export default Routes;
