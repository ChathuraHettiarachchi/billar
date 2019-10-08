import React, {useState, useEffect}  from 'react';
import {Link} from 'react-router-dom';
import {
    Header,
    Segment,
    Form,
    Button
} from "semantic-ui-react";
import Loader from "react-loader-spinner";
import axios from 'axios';
import COUNTRY_OPTIONS from '../../../assets/data/countriesData'
import Select from 'react-select';

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
        country: ''
    });

    useEffect(() => {
        setLoading(false);
    },[]);

    const onFileSelect = () => {

    };

    const updateFieldData = e => {
        const {name, value} = e.target;
        setClient({...client, [name]: value});
    };

    const updateCountrySelect = (e, data) => {
        setClient({...client, 'country': data.value});
    };

    const submitUpdate = data => {
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
                    <Form.Input fluid label='Client name' placeholder='Client name' value={client.name}
                                onChange={updateFieldData} name='name'/>
                    <Form.Input fluid label='Client code' placeholder='Client code' value={client.code}
                                onChange={updateFieldData} name='code'/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input fluid label='Email address' placeholder='Email address' value={client.email}
                                onChange={updateFieldData} name='email'/>
                    <Form.Input fluid label='Contact number' placeholder='Contact number' value={client.contact_number}
                                onChange={updateFieldData} name='contact_number'/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input label='Address Line 1' placeholder='Address Line 1' value={client.address_line_first}
                                onChange={updateFieldData} name='address_line_first'/>
                    <Form.Input label='Address Line 2' placeholder='Address Line 2' value={client.address_line_last}
                                onChange={updateFieldData} name='address_line_last'/>
                    <Form.Select search fluid label='Country' placeholder='Country' options={COUNTRY_OPTIONS}
                                 value={client.country} onChange={updateCountrySelect} name='country' autoComplete="new-password"/>
                </Form.Group>

                <Form.TextArea label='Description' placeholder='Tell us more about client...' value={client.description}
                               onChange={updateFieldData} name='description'/>

                {/*<Form.Input type="file" fluid label='Client logo' placeholder='Select your logo file'/>*/}

                <Button primary onClick={submitUpdate}>Create New Client</Button>
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