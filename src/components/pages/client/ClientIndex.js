import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Grid,
    Header,
    Segment,
    Table,
    Icon
} from "semantic-ui-react";
import axios from 'axios';

function ClientIndex() {

    const [clients, setClients] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:4000/clients/');
            const json = await res.json();

            setClients(json.content.clients)
        };

        fetchData();
    }, []);

    const getTableData = clients => {
        return clients.map(user =>
            <Table.Row key={user.client_id}>
                <Table.Cell>{user.client_id}</Table.Cell>
                <Table.Cell>{user.code}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.contact_number}</Table.Cell>
                <Table.Cell>{user.country}</Table.Cell>
                <Table.Cell>
                    <Button size="mini" icon color="green">
                        <Icon name="desktop"/>
                    </Button>
                    <Button size="mini" icon color="blue">
                        <Icon name="pencil"/>
                    </Button>
                    <Button color="red" size="mini" icon>
                        <Icon name="delete"/>
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    };

    return (
        <div>
            <Segment>
                <Grid style={{minHeight: '0'}}>
                    <Grid.Row>
                        <Grid.Column width={4} floated='left' verticalAlign='middle'>
                            <Header>Clients</Header>
                        </Grid.Column>
                        <Grid.Column width={4} floated='right'>
                            <Button primary floated='right' as={Link} to={'/client/new'}>Add New Client</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment>
                <Table compact celled>
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Code</Table.HeaderCell>
                            <Table.HeaderCell>Client Name</Table.HeaderCell>
                            <Table.HeaderCell>Contact Number</Table.HeaderCell>
                            <Table.HeaderCell>Country</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>{getTableData(clients)}</Table.Body>
                </Table>
            </Segment>
        </div>
    );
}


export default ClientIndex