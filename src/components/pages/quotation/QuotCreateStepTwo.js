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

import fidenz from '../../../assets/images/fidenz.png'
import quotation from '../../../assets/images/quotation.png'
import COUNTRY_OPTIONS from "../../../assets/data/countriesData";

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
                    <Form id='quot_title'>
                        <Form.TextArea fluid placeholder='Project title' maxLength='100' style={{color: "#3371B1", fontSize:"2em", margin:'20px 0px 20px 0px'}}/>
                        <hr/>
                        <Header as='h1' style={{color: "#1579D0"}}>Scope of Work</Header>
                        <Form.TextArea fluid placeholder='Scope of Work' row={3} style={{marginBottom:'30px'}}/>
                        <Header as='h1' style={{color: "#1579D0"}}>Financial</Header>
                    </Form>
                </div>
            </Segment>
        </div>
    );
}


export default QuotCreateStepOne