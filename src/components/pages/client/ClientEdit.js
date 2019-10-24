import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Header, Segment, Form, Button} from "semantic-ui-react";
import Loader from "react-loader-spinner";
import axios from 'axios';
import COUNTRY_OPTIONS from '../../../assets/data/countryOptionList'

const ClientEdit = (props) => {

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
        country: '',
        city:'',
        street:'',
        zipcode:'',
        state:''
    });

    useEffect(() => {
        const fetchData = () => {
            axios.get(process.env.REACT_APP_BASE_URL + 'clients/' + client.client_id)
                .then(res => {
                    console.log(res.data);
                    setLoading(false);

                    let content = res.data.content.clients;
                    setTitle("Edit '" + content.name + "' Info");

                    setClient({
                        ...client,
                        name: content.name,
                        code: content.code,
                        email: content.email,
                        contact_number: content.contact_number,
                        address_line_first: content.address_line_first,
                        address_line_last: content.address_line_last,
                        description: content.description,
                        country: content.country,
                        city: content.city,
                        street: content.street,
                        state: content.state,
                        zipcode: content.zipcode
                    });
                })
                .catch(error => {
                    console.log(error);
                    setTitle("Something went wrong");
                    setLoading(false);
                });
        };

        fetchData();
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
            setTitle("Updating...");
            setLoading(true);

            axios.post(process.env.REACT_APP_BASE_URL + 'clients/update/' + client.client_id, {
                client
            }).then(res => {
                console.log(res);
                props.history.push('/client/index');
            }).catch(error => {
                console.log(error);
                setTitle("Edit '" + client.name + "' Info");
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
                    <Form.Input required fluid label='Contact number' placeholder='Contact number' value={client.contact_number} 
                                onChange={updateFieldData} name='contact_number'/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input required label='Address Line 1' placeholder='Address Line 1' value={client.address_line_first}
                                onChange={updateFieldData} name='address_line_first'/>
                    <Form.Input required label='Address Line 2' placeholder='Address Line 2' value={client.address_line_last}
                                onChange={updateFieldData} name='address_line_last'/>
                    <Form.Input required fluid label='Street' placeholder='Street' name='street' value={client.street}   onChange={updateFieldData}/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input required label='City' placeholder='City' onChange={updateFieldData} value={client.city} name='city' />
                    <Form.Input required label='State / Province' placeholder='State / Province' onChange={updateFieldData} value={client.state} name='state' />
                    <Form.Input required label='Zip Code' placeholder='Zip Code' onChange={updateFieldData} value={client.zipcode} name='zipcode' />
                </Form.Group>

                <Form.Select required search fluid label='Country' placeholder='Country' options={COUNTRY_OPTIONS}
                             value={client.country} onChange={updateCountrySelect} name='country' autoComplete={client.country}/>

                <Form.TextArea label='Description' placeholder='Tell us more about client...' value={client.description}
                               onChange={updateFieldData} name='description'/>

                <Button primary onClick={submitUpdate}>Update Client</Button>
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
};


export default ClientEdit