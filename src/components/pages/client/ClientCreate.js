import React from 'react';
import {Link} from 'react-router-dom';
import {
    Header,
    Segment,
    Form
} from "semantic-ui-react";

function ClientCreate() {
    return(
        <div>
            <Segment>
                <Header>Create a new client</Header>
                <br/>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Client name' placeholder='Client name' />
                        <Form.Input fluid label='Client code' placeholder='Client code' />
                    </Form.Group>

                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Email address' placeholder='Email address' />
                        <Form.Input fluid label='Contact number' placeholder='Contact number' />
                    </Form.Group>

                    <Form.Input fluid label='Contact number' placeholder='Contact number' />

                    <Form.TextArea label='Address' placeholder='Client address' />
                    <Form.TextArea label='Description' placeholder='Tell us more about client...' />
                    <Form.Button primary>Create New Client</Form.Button>
                </Form>
            </Segment>
        </div>
    );
}



export default ClientCreate