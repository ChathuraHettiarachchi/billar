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

const ClientView = (props) => {

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

    useEffect(() => {
        const fetchData = () => {
            axios.get(process.env.REACT_APP_BASE_URL + 'clients/' + client.client_id)
                .then(res => {
                    console.log(res.data);
                    setLoading(false);

                    let content = res.data.content.clients;
                    setTitle("'" + content.name + "' Info");

                    setClient({
                        ...client,
                        name: content.name,
                        code: content.code,
                        email: content.email,
                        contact_number: content.contact_number,
                        address_line_first: content.address_line_first,
                        address_line_last: content.address_line_last,
                        description: content.description,
                        country: content.country
                    });
                })
                .catch(error => {
                    console.log(error);
                    setTitle("Something went wrong");
                    setLoading(false);
                });
        };

        fetchData();
    },[]);

    const onFileSelect = () => {

    };

    useEffect(() => {
        const fetchData = () => {
            const url = props.location.search;
            console.log('url is: '+url);
        };

        fetchData();
    }, []);

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
                    <Form.Input fluid label='Client name' placeholder='Client name' value={client.name}
                                readOnly name='name'/>
                    <Form.Input fluid label='Client code' placeholder='Client code' value={client.code}
                                readOnly name='code'/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input fluid label='Email address' placeholder='Email address' value={client.email}
                                readOnly name='email'/>
                    <Form.Input fluid label='Contact number' placeholder='Contact number' value={client.contact_number}
                                readOnly name='contact_number'/>
                </Form.Group>

                <Form.Group widths='equal'>
                    <Form.Input label='Address Line 1' placeholder='Address Line 1' value={client.address_line_first}
                                readOnly name='address_line_first'/>
                    <Form.Input label='Address Line 2' placeholder='Address Line 2' value={client.address_line_last}
                                readOnly name='address_line_last'/>
                    <Form.Select fluid label='Country' placeholder='Country' options={COUNTRY_OPTIONS}
                                 value={client.country} disabled name='country'/>
                </Form.Group>

                <Form.TextArea label='Description' placeholder='Tell us more about client...' value={client.description}
                               readOnly name='description'/>

                {/*<Form.Input type="file" fluid label='Client logo' placeholder='Select your logo file'/>*/}
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


export default ClientView