import React, {useState} from 'react';
import {
    Grid, Label
} from "semantic-ui-react";

import './Quotation.css'

function QuotationInfo({no, createdDate, updatedDate}) {

    let number = "";
    if (no === "New"){
        number = "New Quotation";
    } else {
        number = "#"+no;
    }

    return (
        <Grid className='quotation_detail fidenz_color'>
            <Grid.Column width={4} textAlign='left' verticalAlign='middle'>
                <p>Quotation No: {number}</p>
            </Grid.Column>
            <Grid.Column width={8} textAlign='center' verticalAlign='middle'>
                <p>Created Date:  {createdDate}</p>
            </Grid.Column>
            <Grid.Column width={4} textAlign='right' verticalAlign='middle'>
                <p>Updated Date:  {updatedDate}</p>
            </Grid.Column>
        </Grid>
    );
}

export default QuotationInfo