import React, {useState}  from 'react';
import {
    Header,
    Grid
} from "semantic-ui-react";

function AddressSection() {
    return(
        <Grid style={{minHeight:'80px', padding: '8px'}}>
            <Grid.Column width={4}>
                <Grid.Row>
                    <Header><b>Customer:</b></Header>
                    <address style={{fontSize:18, color:'#535353'}}>Client name here<br/>
                        Address line 1<br/>
                        Address line 2<br/>
                        email address of the client</address>
                </Grid.Row>
            </Grid.Column>
            <Grid.Column width={8}/>
            <Grid.Column width={4} textAlign='right'>
                <Grid.Row>
                    <Header><b>From:</b></Header>
                    <address style={{fontSize:18, color:'#535353'}}>Fidenz Private Limited<br/>
                        No. 239, Nawala Road,<br/>
                        Nawala, Sri Lanka<br/>
                        info@fidenz.com</address>
                </Grid.Row>
            </Grid.Column>
        </Grid>
    );
}

export default AddressSection