import React, {useState}  from 'react';
import {Link} from 'react-router-dom';
import {
    Header,
    Segment,
    Form,
    Button
} from "semantic-ui-react";

import COUNTRY_OPTIONS from '../../../assets/data/countriesData'

function ClientCreate() {

    const onFileSelect = () => {

    };

    return (
        <div>
            <Segment>
                <Header>Create a new client</Header>
                <br/>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Client name' placeholder='Client name'/>
                        <Form.Input fluid label='Client code' placeholder='Client code'/>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Email address' placeholder='Email address'/>
                        <Form.Input fluid label='Contact number' placeholder='Contact number'/>
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Select fluid label='Country' placeholder='Country' options={COUNTRY_OPTIONS}/>
                        <Form.Input type="file" fluid label='Client logo' placeholder='Select your logo file'/>
                    </Form.Group>

                    <Form.TextArea label='Address' placeholder='Client address'/>
                    <Form.TextArea label='Description' placeholder='Tell us more about client...'/>
                    <Form.Button primary right>Create New Client</Form.Button>
                </Form>
            </Segment>
        </div>
    );
}


export default ClientCreate