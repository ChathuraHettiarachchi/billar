import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Grid,
    Header,
    Segment,
    Table,
    Icon,
    Confirm
} from "semantic-ui-react";
import axios from 'axios';
import Loader from "react-loader-spinner";

const ClientIndex = () => {

    const [clients, setClients] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(process.env.REACT_APP_BASE_URL + 'clients/');
            const json = await res.json();

            setLoading(false);
            setClients(json.content.clients);
        };


        fetchData();
    }, []);

    const handleConfirmation = e => {
        const r = window.confirm("Do you really want to remove this user?");
        if (r == true) {
            axios.delete(process.env.REACT_APP_BASE_URL + 'clients/remove/' + e.target.value)
                .then(res => {
                    console.log(res);
                    window.location.reload()
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };

    const handleCancel = () => {

    }

    const getTableData = clients => {
        return clients.map((user, index) =>
            <Table.Row key={user.client_id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{user.code}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.contact_number}</Table.Cell>
                <Table.Cell>{user.country}</Table.Cell>
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
                    {/*<Confirm
                        open={isConfirmOpen}
                        content='Are you sure, you need to delete this client?'
                        onCancel={handleCancel}
                        cancelButton='Never mind'
                        confirmButton="Let's do it"
                        onConfirm={handleConfirm}
                        style={{position:''}}
                    />*/}
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
                    <Loader type="Plane" color="blue" height="100" width="100"/>
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
        </div>
    );
}


export default ClientIndex