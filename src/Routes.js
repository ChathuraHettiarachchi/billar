import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/login/Login'
import Layout from './components/Layout'

import Home from './components/pages/Home'
import ClientIndex from './components/pages/client/ClientIndex'
import ClientCreate from './components/pages/client/ClientCreate'

const Routes = () => {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/client/index" component={ClientIndex} />
            <Route exact path="/client/new" component={ClientCreate} />
        </Layout>
    );
};

export default Routes;
