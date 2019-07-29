import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
    Header,
    Segment,
    Form,
    Button, Table
} from "semantic-ui-react";
import Loader from "react-loader-spinner";

import COUNTRY_OPTIONS from '../../../assets/data/countriesData'

function ClientCreate(props) {

    const [isLoading, setLoading] = useState(true);
    const [client, setClient] = useState({
        client_id: (props.location.pathname).split("/")[2],
        name: '',
        code: '',
        email: '',
        contact_number: '',
        address_line_first: '',
        address_line_last: '',
        description: '',
        country: ''
    });

    const onFileSelect = () => {

    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(('http://localhost:4000/clients/' + client.client_id));
            const json = await res.json();

            setLoading(false);

            let c = json.content.clients;
            setClient({
                name: c.name,
                code: c.code,
                email: c.email,
                contact_number: c.contact_number,
                address_line_first: c.address_line_first,
                address_line_last: c.address_line_last,
                description: c.description,
                country: c.country
            });
        };

        fetchData();
    }, []);

    const updateField = e => {
        setClient({
            [e.target.name]: e.target.value
        });
    };

    let content;
    if (isLoading) {
        content =
            <div>
                <div style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                >
                    <Loader type="Plane" color="blue" height="100" width="100"/>
                </div>
            </div>
    } else {
        content =
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Client name' placeholder='Client name' value={client.name}/>
                    <Form.Input fluid label='Client code' placeholder='Client code' value={client.code}/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input fluid label='Email address' placeholder='Email address' value={client.email}/>
                    <Form.Input fluid label='Contact number' placeholder='Contact number' value={client.contact_number}/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input label='Address Line 1' placeholder='Address Line 1' value={client.address_line_first}/>
                    <Form.Input label='Address Line 2' placeholder='Address Line 2' value={client.address_line_last}/>
                    <Form.Select fluid label='Country' placeholder='Country' options={COUNTRY_OPTIONS} value={client.country}/>
                </Form.Group>

                <Form.TextArea label='Description' placeholder='Tell us more about client...' value={client.description}/>

                {/*<Form.Input type="file" fluid label='Client logo' placeholder='Select your logo file'/>*/}

                <Button primary>Update Client</Button>
            </Form>
    }

    return (
        <div>
            <Segment>
                <Header>Edit Client Info</Header>
                <br/>
                {content}
            </Segment>
        </div>
    );
}


export default ClientCreate