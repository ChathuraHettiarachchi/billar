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
import Loader from "react-loader-spinner";
import axios from "axios";

function StatusIndex() {

    const [statusList, setStatusList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            axios.get(process.env.REACT_APP_BASE_URL + 'status')
                .then(res => {
                    setLoading(false);
                    setStatusList(res.content.status_list);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        };

        fetchData();
    }, []);

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
        axios.delete(process.env.REACT_APP_BASE_URL + 'status/remove/' + deletingItem)
            .then(res => {
                console.log(res);
                window.location.reload()
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    };

    const getTableData = statusList => {
        return statusList.map((status, index) =>
            <Table.Row key={status.status_id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{status.title}</Table.Cell>
                <Table.Cell style={{backgroundColor:status.color}}/>
                <Table.Cell>
                    <Button size="mini" icon color="green" as={Link} to={'/status/' + status.status_id + '/view'}>
                        <Icon name="desktop"/>
                    </Button>
                    <Button size="mini" icon color="blue" as={Link} to={'/status/' + status.status_id + '/edit'}>
                        <Icon name="pencil"/>
                    </Button>
                    <Button color="red" size="mini" icon onClick={handleConfirmation} value={status.status_id} key={status.status_id}>
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
            <Modal
                id='modal'
                basic
                size='tiny'
                open={modalOpen}>
                <Header icon='archive' content='Delete Confirmation'/>
                <Modal.Content>
                    <p>
                        Do you really want to remove this project status?
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


export default StatusIndex