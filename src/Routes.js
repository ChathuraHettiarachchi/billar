import React from 'react';
import {Route} from 'react-router-dom';

import Login from './components/login/Login'
import Layout from './components/Layout'

import Home from './components/pages/Home'
import ClientIndex from './components/pages/client/ClientIndex'
import ClientCreate from './components/pages/client/ClientCreate'

import QuotIndex from './components/pages/quotation/QuotIndex'
import QuotCreateStepOne from './components/pages/quotation/QuotCreateStepOne'
import QuotCreateStepTwo from './components/pages/quotation/QuotCreateStepTwo'

const Routes = () => {
    return (
        <Layout>
            <Route exact path="/" component={Home}/>

            <Route exact path="/client/index" component={ClientIndex}/>
            <Route exact path="/client/new" component={ClientCreate}/>

            <Route exact path="/quotation/index" component={QuotIndex}/>
            <Route exact path="/quotation/step1" component={QuotCreateStepOne}/>
            <Route exact path="/quotation/step2" component={QuotCreateStepTwo}/>
        </Layout>
    );
};

export default Routes;
