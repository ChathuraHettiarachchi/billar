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
                        <Form.Input label='Address Line 1' placeholder='Address Line 1'/>
                        <Form.Input label='Address Line 2' placeholder='Address Line 2'/>
                        <Form.Select fluid label='Country' placeholder='Country' options={COUNTRY_OPTIONS}/>
                    </Form.Group>

                    <Form.TextArea label='Description' placeholder='Tell us more about client...'/>

                    <Form.Input type="file" fluid label='Client logo' placeholder='Select your logo file'/>

                    <Button primary>Create New Client</Button>
                </Form>
            </Segment>
        </div>
    );
}


export default ClientCreate