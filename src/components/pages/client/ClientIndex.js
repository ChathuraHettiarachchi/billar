import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Grid,
    Header,
    Segment,
    Table,
    Icon,
    Modal
} from "semantic-ui-react";
import axios from 'axios';
import Loader from "react-loader-spinner";
import COUNTRY_OPTIONS from '../../../assets/data/countryOptionList'

const ClientIndex = () => {

    const [clients, setClients] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            axios.get(process.env.REACT_APP_BASE_URL + 'clients')
                .then(res => {
                    setLoading(false);
                    setClients(res.content.clients);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        };

        fetchData();
    }, []);

    const countryName = (slug) => {
        for(let i=0; i<COUNTRY_OPTIONS.length; i++){
            let c = COUNTRY_OPTIONS[i];
            if (c.key === slug){
                return c.text;
            }
        }
    };

    const handleConfirmation = (event, data) => {
        handleModelVisibility();
        setDeletingItem(data.value);
        console.log(data.value)
    };

    const handleModelVisibility = () => {
        setModalOpen(!modalOpen)
    };

    const handleItemDelete = () => {
        setLoading(true);
        axios.delete(process.env.REACT_APP_BASE_URL + 'clients/remove/' + deletingItem)
            .then(res => {
                console.log(res);
                window.location.reload()
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    };


    const getTableData = clients => {
        return clients.map((user, index) =>
            <Table.Row key={user.client_id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{user.code}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.contact_number}</Table.Cell>
                <Table.Cell>{countryName(user.country)}</Table.Cell>
                <Table.Cell>
                    <Button size="mini" icon color="green" as={Link} to={'/client/' + user.client_id + '/view'}>
                        <Icon name="desktop"/>
                    </Button>
                    <Button size="mini" icon color="blue" as={Link} to={'/client/' + user.client_id + '/edit'}>
                        <Icon name="pencil"/>
                    </Button>
                    <Button color="red" size="mini" icon onClick={handleConfirmation} value={user.client_id} key={user.client_id}>
                        <Icon name="delete"/>
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    };

    let tableContent;
    if (isLoading) {
        tableContent =
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
        tableContent =
            <Table compact celled>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell width={1}>No.</Table.HeaderCell>
                        <Table.HeaderCell>Code</Table.HeaderCell>
                        <Table.HeaderCell>Client Name</Table.HeaderCell>
                        <Table.HeaderCell>Contact Number</Table.HeaderCell>
                        <Table.HeaderCell>Country</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {getTableData(clients)}
                </Table.Body>
            </Table>

    }

    return (
        <div>
            <Segment>
                <Grid style={{minHeight: '0'}}>
                    <Grid.Row>
                        <Grid.Column width={4} floated='left' verticalAlign='middle'>
                            <Header>Clients</Header>
                        </Grid.Column>
                        <Grid.Column width={4} floated='right'>
                            <Button primary floated='right' as={Link} to={'/client/create/new'}>Add New Client</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment>
                {tableContent}
            </Segment>
            <Modal
                id='modal'
                basic
                size='tiny'
                open={modalOpen}>
                <Header icon='archive' content='Delete Confirmation'/>
                <Modal.Content>
                    <p>
                        Do you really want to remove this client?  This will also remove client related quotations too.
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={handleModelVisibility}>
                        <Icon name='remove'/> No
                    </Button>
                    <Button color='green' inverted onClick={handleItemDelete}>
                        <Icon name='checkmark'/> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}


export default ClientIndex