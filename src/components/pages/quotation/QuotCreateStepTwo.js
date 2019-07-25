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

function QuotCreateStepOne() {
    return (
        <div>
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
                <AddressSection/>
                <QuotationInfo/>
            </Segment>
        </div>
    );
}


export default QuotCreateStepOne