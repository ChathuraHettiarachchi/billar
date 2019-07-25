import React, {useState} from 'react';
import {
    Grid, Label
} from "semantic-ui-react";

import './Quotation.css'

function QuotationInfo() {
    return (
        <Grid className='quotation_detail fidenz_color'>
            <Grid.Column width={4} textAlign='left' verticalAlign='middle'>
                <p>Quotation No:</p>
            </Grid.Column>
            <Grid.Column width={8} textAlign='center' verticalAlign='middle'>
                <p>Quotation No:</p>
            </Grid.Column>
            <Grid.Column width={4} textAlign='right' verticalAlign='middle'>
                <p>Quotation No:</p>
            </Grid.Column>
        </Grid>
    );
}

export default QuotationInfo