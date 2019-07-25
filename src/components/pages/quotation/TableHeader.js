import React, {useState} from 'react';
import {
    Grid
} from "semantic-ui-react";

import './Quotation.css'

function TableHeader({title}) {
    return (
        <Grid className='project_title fidenz_color'>
            <Grid.Column width={4}/>
            <Grid.Column width={8} textAlign='center' verticalAlign='middle'>
                <p style={{color: 'white'}}>{title}</p>
            </Grid.Column>
            <Grid.Column width={4}/>
        </Grid>
    );
}

export default TableHeader