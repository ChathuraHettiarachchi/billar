import React, {useEffect, useState} from 'react';
import {Button, Form, Header, Segment} from "semantic-ui-react";
import Loader from "react-loader-spinner";
import axios from 'axios';
import COUNTRY_OPTIONS from '../../../assets/data/countryOptionList'

const ClientCreate = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [pageTitle, setTitle] = useState('Create New Client');
    const [client, setClient] = useState({
        name: '',
        code: '',
        email: '',
        contact_number: '',
        address_line_first: '',
        address_line_last: '',
        description: '',
        country: '',
        city: '',
        street: '',
        zipcode: '',
        state: ''
    });

    useEffect(() => {
        setLoading(false);
    }, []);

    const isValidForm = () => {
        let result = true;
        let data = Object.entries(client);

        for (const [id, value] of data) {
            if (value.length === 0){
                result = false;
                break;
            }
        }

        return result;
    };

    const updateFieldData = e => {
        const {name, value} = e.target;
        setClient({...client, [name]: value});
    };

    const updateCountrySelect = (e, data) => {
        setClient({...client, 'country': data.value});
    };

    const submitUpdate = data => {

        if (isValidForm()) {
            setTitle("Creating...");
            setLoading(true);

            axios.post(process.env.REACT_APP_BASE_URL + 'clients/new', {
                client
            }).then(res => {
                console.log(res);
                props.history.push('/client/index');
            }).catch(error => {
                console.log(error);
                setTitle("Create New Client");
                setLoading(false);
            });
        } else {
            alert('Please fill all fields to continue');
        }
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
                    <Loader type="Oval" color="blue" height="100" width="100"/>
                </div>
            </div>
    } else {
        content =
            <Form>
                <Form.Group widths='equal'>
                    <Form.Input required fluid label='Client name' placeholder='Client name' value={client.name}
                                onChange={updateFieldData} name='name'/>
                    <Form.Input required fluid label='Client code' placeholder='Client code' value={client.code}
                                onChange={updateFieldData} name='code'/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input required fluid label='Email address' placeholder='Email address' value={client.email}
                                onChange={updateFieldData} name='email'/>
                    <Form.Input required fluid label='Contact number' placeholder='Contact number'
                                value={client.contact_number}
                                onChange={updateFieldData} name='contact_number'/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input required label='Address Line 1' placeholder='Address Line 1'
                                value={client.address_line_first}
                                onChange={updateFieldData} name='address_line_first' hint='Thisisis'/>
                    <Form.Input required label='Address Line 2' placeholder='Address Line 2'
                                value={client.address_line_last}
                                onChange={updateFieldData} name='address_line_last'/>
                    <Form.Input required fluid label='Street' placeholder='Street' name='street' value={client.street}
                                autoComplete="new-password" onChange={updateFieldData}/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input required label='City' placeholder='City' onChange={updateFieldData}
                                value={client.city} name='city'/>
                    <Form.Input required label='State / Province' placeholder='State / Province'
                                onChange={updateFieldData} value={client.state} name='state' />
                    <Form.Input required label='Zip Code' placeholder='Zip Code' onChange={updateFieldData}
                                value={client.zipcode} name='zipcode' />
                </Form.Group>

                <Form.Select required search fluid label='Country' placeholder='Country' options={COUNTRY_OPTIONS}
                             value={client.country} onChange={updateCountrySelect} name='country'
                             autoComplete="new-password"/>

                <Form.TextArea label='Description' placeholder='Tell us more about client...' value={client.description}
                               onChange={updateFieldData} name='description'/>

                <Button primary onClick={submitUpdate}>Create New Client</Button>
            </Form>
    }

    return (
        <div>
            <Segment>
                <Header>{pageTitle}</Header>
                <br/>
                <p>Following data will be displayed on the quotation.</p>
                <ul>
                    <li>Client name</li>
                    <li>Address line 1</li>
                    <li>Address line 2, Country</li>
                    <li>Email</li>
                </ul>
                <br/>
                {content}
            </Segment>
        </div>
    );
}


export default ClientCreate