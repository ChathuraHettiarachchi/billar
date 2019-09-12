import React from 'react';
import {Route} from 'react-router-dom';

import Login from './components/login/Login'

import Home from './components/pages/Home'
import ClientIndex from './components/pages/client/ClientIndex'
import ClientCreate from './components/pages/client/ClientCreate'
import ClientEdit from './components/pages/client/ClientEdit'
import ClientView from './components/pages/client/ClientView'

import StatusIndex from './components/pages/status/StatusIndex'
import StatusForm from './components/pages/status/StatusForm'

import QuotIndex from './components/pages/quotation/QuotIndex'
import QuotCreateStepOne from './components/pages/quotation/QuotCreateStepOne'
import QuotCreateStepTwo from './components/pages/quotation/QuotCreateStepTwo'

import Invoice from './components/pages/invoice/InvoiceIndex'

import Releases from './components/pages/releases/ReleasesIndex'

const Routes = () => {
    return (
        <>
            <Route exact path="/" component={Home}/>

            <Route exact path="/client/index" component={ClientIndex}/>
            <Route exact path="/client/create/new" component={ClientCreate}/>
            <Route exact path="/client/:id/view" component={ClientView}/>
            <Route exact path="/client/:id/edit" component={ClientEdit}/>

            <Route exact path="/quotation/index" component={QuotIndex}/>
            <Route exact path="/quotation/step1" component={QuotCreateStepOne}/>
            <Route exact path="/quotation/step2/:id/new" component={QuotCreateStepTwo}/>
            <Route exact path="/quotation/step2/:id/view/:quotationId" component={QuotCreateStepTwo}/>
            <Route exact path="/quotation/step2/:id/edit/:quotationId" component={QuotCreateStepTwo}/>

            <Route exact path="/invoice/index" component={Invoice}/>

            <Route exact path="/releases/index" component={Releases}/>

            <Route exact path="/status/index" component={StatusIndex}/>
            <Route exact path="/status/create/new" component={StatusForm}/>
            <Route exact path="/status/:id/view" component={StatusForm}/>
            <Route exact path="/status/:id/edit" component={StatusForm}/>
        </>
    );
};

export default Routes;
