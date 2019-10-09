import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Grid, Header, Icon, Modal, Segment, Table} from "semantic-ui-react";
import Loader from "react-loader-spinner";
import axios from 'axios';
import Moment from 'moment';

const QuotIndex = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [quotations, setQuotations] = useState([]);
    const [statusList, setStatusList] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState(false);

    useEffect(() => {
        const fetchData = () => {

            axios.all([
                axios.get(process.env.REACT_APP_BASE_URL + 'quotations/'),
                axios.get(process.env.REACT_APP_BASE_URL + 'status/')
            ]).then(axios.spread((quotations, statusList) => {
                let quots = quotations.data.content.quotations;
                let statusData = statusList.data.content.status_list;
                let statusForSelect = statusData.map(status => {
                    return {
                        "text": status.title,
                        "key": status.status_id,
                        "value": status.status_id
                    }
                });

                setStatusList(statusData);
                setQuotations(quots);
                setStatusOptions(statusForSelect);
            })).then(() => {
                setLoading(false);
            }).catch(error => {
                console.log(error);
                setLoading(false);
            });
        };


        fetchData();
    }, []);

    const onQuotationStateChange = (event, index, rowValue) => {
        console.log(index.value);
        console.log(index['data-id']);

        const _tempQuotations = [...quotations];
        _tempQuotations[index['data-id']]['status'] = index.value;

        setQuotations(_tempQuotations);

        setLoading(true);
        axios.post((process.env.REACT_APP_BASE_URL + 'quotations/update/' + quotations[index['data-id']].quotation_id + '/status'), {
            quotation: {
                status: index.value
            }
        }).then(res => {
            console.log(res);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
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
        axios.delete(process.env.REACT_APP_BASE_URL + 'quotations/remove/' + deletingItem)
            .then(res => {
                console.log(res);
                window.location.reload()
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    };

    const getStatusColor = quotation => {
        let color;
        if (quotation.status === null || quotation.status === '') {
            color = '#fff';
        } else {
            try {
                color = statusList.find(x => x.status_id === parseInt(quotation.status)).color;
            } catch (e) {
                color = '#fff';
            }
        }
        return color
    };

    const getTableData = quotations => {
        return quotations.map((quotation, index) =>
            <Table.Row key={quotation.quotation_id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell><b>#{(Moment(quotation.created_at).format('YYYYMM') + '00' + quotation.quotation_id)}</b></Table.Cell>
                <Table.Cell>{quotation.code}</Table.Cell>
                <Table.Cell>{quotation.title}</Table.Cell>
                <Table.Cell>{new Date(quotation.created_at).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                    <Form>
                        <Form.Select
                            fluid
                            options={statusOptions}
                            value={parseInt(quotation.status)}
                            onChange={onQuotationStateChange}
                            name='status'
                            data-id={index}
                            style={{backgroundColor: (getStatusColor(quotation))}}
                        />
                    </Form>
                </Table.Cell>
                <Table.Cell>{quotation.amount}</Table.Cell>
                <Table.Cell>
                    <Button size="mini" icon color="green" as={Link}
                            to={'/quotation/step2/' + quotation.client_id + '/view/' + quotation.quotation_id}>
                        <Icon name="desktop"/>
                    </Button>
                    <Button size="mini" icon color="blue" as={Link}
                            to={'/quotation/step2/' + quotation.client_id + '/edit/' + quotation.quotation_id}>
                        <Icon name="pencil"/>
                    </Button>
                    <Button color="red" size="mini" icon onClick={handleConfirmation} value={quotation.quotation_id} key={quotation.quotation_id}>
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
                        <Table.HeaderCell width={2}>Quotation No.</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Client Code</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Title</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Created At</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Status</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Amount</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {getTableData(quotations)}
                </Table.Body>
            </Table>

    }


    return (
        <div style={{position: 'relative'}}>
            <div>
                <Segment>
                    <Grid style={{minHeight: '0'}}>
                        <Grid.Row>
                            <Grid.Column width={4} floated='left' verticalAlign='middle'>
                                <Header>Quotations</Header>
                            </Grid.Column>
                            <Grid.Column width={4} floated='right'>
                                <Button primary floated='right' as={Link} to={'/quotation/step1'}>Add New
                                    Quotation</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment>
                    {tableContent}
                </Segment>
            </div>
            <Button id='fab' circular icon='filter' style={{
                width: '60px',
                height: '60px',
                position: 'fixed',
                right: '20px',
                bottom: '20px',
                background: '#1b1c1d'
            }}/>
            <Modal
                id='modal'
                basic
                size='large'
                open={modalOpen}>
                <Header icon='archive' content='Delete Confirmation'/>
                <Modal.Content>
                    <p>
                        Do you really want to remove this quotation? This will remove all associated invoices,
                        releases and other data.
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


export default QuotIndex