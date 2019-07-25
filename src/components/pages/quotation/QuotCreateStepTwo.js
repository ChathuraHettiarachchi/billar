import React, {useState}  from 'react';
import {Link} from 'react-router-dom';
import {
    Header,
    Segment,
    Form,
    Button,
    Grid,
    Image
} from "semantic-ui-react";

import AddressSection from './AddressSection'
import QuotationInfo from './QuotationInfo'
import Financials from './Financials'
import PaymentPlan from './PaymentPlan'
import Terms from './Terms'

import fidenz from '../../../assets/images/fidenz.png'
import quotation from '../../../assets/images/quotation.png'


function QuotCreateStepOne() {
    return (
        <div id='quotation'>
            <Segment style={{padding:'50px'}}>
                <Grid style={{minHeight:'90px'}}>
                    <Grid.Column width={4}>
                        <Image src={fidenz} style={{height:'60px'}}/>
                    </Grid.Column>
                    <Grid.Column width={8}/>
                    <Grid.Column width={4}>
                        <Image src={quotation} style={{height:'60px'}} floated='right'/>
                    </Grid.Column>
                </Grid>
                <div style={{padding:'8px'}}>
                    <AddressSection/>
                    <QuotationInfo/>
                    <br/>
                    <Form>
                        <Form.TextArea rows={2} placeholder='Project title' maxLength='100' style={{color: "#3371B1", fontSize:"2em", margin:'20px 0px 20px 0px'}}/>
                        <hr/>
                        <Header as='h1' style={{color: "#1579D0"}}>Scope of Work</Header>
                        <Form.TextArea placeholder='Scope of Work' rows={4} style={{marginBottom:'20px'}}/>
                    </Form>

                    <br/>
                    <Financials/>
                    <br/>
                    <br/>
                    <PaymentPlan/>
                    <br/>
                    <br/>
                    <Terms/>
                    <Grid style={{minHeight:'40px', padding: '0rem !important'}}>
                        <Grid.Column id='create_quot_button' width={16} floated='right'>
                            <Button primary floated='right'> Create Quotation</Button>
                        </Grid.Column>
                    </Grid>
                </div>
            </Segment>
        </div>
    );
}


export default QuotCreateStepOne