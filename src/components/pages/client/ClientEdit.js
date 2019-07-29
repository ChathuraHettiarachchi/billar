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
    const [pageTitle, setTitle] = useState('Loading...');
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
            setTitle("Edit '"+json.content.clients.name+"' Info");

            let c = json.content.clients;
            setClient({
                ...client,
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

    const updateFieldData = e => {
        const {name, value} = e.target;
        setClient({...client, [name]: value});
    };

    const updateCountrySelect = (e, data) => {
        setClient({...client, 'country': data.value});
    };

    const submitUpdate = data => {
        setTitle("Updating...");
        setLoading(true);

        (async () => {
            console.log(JSON.stringify(client))
            const rawResponse = await fetch(('http://localhost:4000/clients/update/'+client.client_id), {
                method: 'POST',
                header: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                body: JSON.stringify(client)
            });
            const content = await rawResponse.json();

            if (rawResponse.status === 200){
                props.history.push('/clients/');
            } else {
                setTitle("Edit '"+client.name+"' Info");
                setLoading(false);
            }
            console.log(content);
        })();
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
                    <Form.Input fluid label='Client name' placeholder='Client name' value={client.name} onChange={updateFieldData} name='name'/>
                    <Form.Input fluid label='Client code' placeholder='Client code' value={client.code} onChange={updateFieldData} name='code'/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input fluid label='Email address' placeholder='Email address' value={client.email} onChange={updateFieldData} name='email'/>
                    <Form.Input fluid label='Contact number' placeholder='Contact number' value={client.contact_number} onChange={updateFieldData} name='contact_number'/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input label='Address Line 1' placeholder='Address Line 1' value={client.address_line_first} onChange={updateFieldData} name='address_line_first'/>
                    <Form.Input label='Address Line 2' placeholder='Address Line 2' value={client.address_line_last} onChange={updateFieldData} name='address_line_last'/>
                    <Form.Select fluid label='Country' placeholder='Country' options={COUNTRY_OPTIONS} value={client.country} onChange={updateCountrySelect} name='country'/>
                </Form.Group>

                <Form.TextArea label='Description' placeholder='Tell us more about client...' value={client.description} onChange={updateFieldData} name='description'/>

                {/*<Form.Input type="file" fluid label='Client logo' placeholder='Select your logo file'/>*/}

                <Button primary onClick={submitUpdate}>Update Client</Button>
            </Form>
    }

    return (
        <div>
            <Segment>
                <Header>{pageTitle}</Header>
                <br/>
                {content}
            </Segment>
        </div>
    );
}


export default ClientCreate