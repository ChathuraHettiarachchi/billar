import React, {useState}  from 'react';
import {
    Header,
    Grid
} from "semantic-ui-react";

import './Quotation.css'
import COUNTRY_OPTIONS from '../../../assets/data/countryOptionList'

const AddressSection = ({client}) => {

    const countryName = (slug) => {
        for(let i=0; i<COUNTRY_OPTIONS.length; i++){
            let c = COUNTRY_OPTIONS[i];
            if (c.key === slug){
                return c.text;
            }
        }
    };

    return(
        <Grid style={{minHeight:'80px'}}>
            <Grid.Column width={4}>
                <Header><b>Customer:</b></Header>
                <address style={{fontSize:18, color:'#535353'}}>{client.name}<br/>
                    {client.address_line_first}<br/>
                    {client.address_line_last}, {countryName(client.country)}<br/>
                    {client.email}</address>
            </Grid.Column>
            <Grid.Column width={8}/>
            <Grid.Column width={4} textAlign='right'>
                <Header><b>From:</b></Header>
                <address style={{fontSize:18, color:'#535353'}}>Fidenz Private Limited<br/>
                    No. 239, Nawala Road,<br/>
                    Nawala, Sri Lanka<br/>
                    info@fidenz.com</address>
            </Grid.Column>
        </Grid>
    );
};

export default AddressSection