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
import Loader from "react-loader-spinner";

function StatusIndex() {

    const [statusList, setStatusList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:4000/status/');
            const json = await res.json();

            setLoading(false);
            setStatusList(json.content.status_list);
        };


        fetchData();
    }, []);

    const getTableData = statusList => {
        return statusList.map(status =>
            <Table.Row key={status.status_id}>
                <Table.Cell>{status.status_id}</Table.Cell>
                <Table.Cell>{status.title}</Table.Cell>
                <Table.Cell color={status.color}>{status.color}</Table.Cell>
                <Table.Cell>
                    <Button size="mini" icon color="green" as={Link} to={'/status/' + status.client_id + '/view'}>
                        <Icon name="desktop"/>
                    </Button>
                    <Button size="mini" icon color="blue" as={Link} to={'/status/' + status.client_id + '/edit'}>
                        <Icon name="pencil"/>
                    </Button>
                    <Button color="red" size="mini" icon>
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
                    <Loader type="Plane" color="blue" height="100" width="100"/>
                </div>
            </div>
    } else {
        tableContent =
            <Table compact celled>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Color</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {getTableData(statusList)}
                </Table.Body>
            </Table>

    }

    return (
        <div>
            <Segment>
                <Grid style={{minHeight: '0'}}>
                    <Grid.Row>
                        <Grid.Column width={4} floated='left' verticalAlign='middle'>
                            <Header>Project Status List</Header>
                        </Grid.Column>
                        <Grid.Column width={4} floated='right'>
                            <Button primary floated='right' as={Link} to={'/status/create/new'}>Add Project
                                Status</Button>
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


export default StatusIndex