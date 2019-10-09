import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Grid, Header, Icon, Modal, Segment, Table} from "semantic-ui-react";
import Loader from "react-loader-spinner";
import axios from 'axios';
import Moment from 'moment';
import FILTER_OPTIONS from "../../../assets/data/quotationFilterOptions";

const QuotIndex = (props) => {

    const [isLoading, setLoading] = useState(true);

    const [quotations, setQuotations] = useState([]);
    const [tempQuotations, setTempQuotations] = useState([]);

    const [statusList, setStatusList] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);

    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState(false);

    const [isFilterSet, setIsFilterSet] = useState(false);
    const [filterReqData, setFilterReqData]=useState({
        type:'',
        searchParam:''
    });

    useEffect(() => {
        const fetchData = () => {

            axios.all([
                axios.get(process.env.REACT_APP_BASE_URL + 'quotations/'),
                axios.get(process.env.REACT_APP_BASE_URL + 'status/')
            ]).then(axios.spread((quotations, statusList) => {
                let statusData = statusList.data.content.status_list;
                let statusForSelect = statusData.map(status => {
                    return {
                        "text": status.title,
                        "key": status.status_id,
                        "value": status.status_id
                    }
                });
                setStatusList(statusData);
                setStatusOptions(statusForSelect);

                let quots = quotations.data.content.quotations;
                let quotsList = quots.map(q => {
                    return {
                        ...q,
                        "quotNumber":("#"+(Moment(q.created_at).format('YYYYMM') + '00' + q.quotation_id)),
                        "created_at":(new Date(q.created_at).toLocaleDateString()),
                        "status_name": (getStatusName(q.status, statusData))
                    }
                });
                setQuotations(quotsList);
                setTempQuotations(quotsList);

            })).then(() => {
                setLoading(false);
            }).catch(error => {
                console.log(error);
                setLoading(false);
            });
        };


        fetchData();
    }, []);

    const getStatusName = (id, data) =>{
        let status;
        if (id === null || id === '') {
            status = 'N/A, Not Assigned';
        } else {
            try {
                status = data.find(x => x.status_id === parseInt(id)).title;
            } catch (e) {
                status = e;
            }
        }
        return status
    };

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
         handleConfirmationModalVisibility();
         setDeletingItem(data.value);
        console.log(data.value)
    };

    const handleConfirmationModalVisibility = () => {
        setConfirmationModalOpen(!confirmationModalOpen)
    };

    const handleFilterModalVisibility = () => {
        setFilterModalOpen(!filterModalOpen)
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

    const filterData = () => {
        handleFilterModalVisibility();
        setIsFilterSet(true);
        filterWithParams();
    };

    const clearFilter = () => {
        setFilterReqData({
            type:'',
            searchParam:''
        });
        setIsFilterSet(false);

        setQuotations(tempQuotations);
    };

    const handleFilterSearchChange = (event, data) => {
        setFilterReqData({...filterReqData, 'searchParam': data.value})
    };

    const handleFilterTypeChange = (event, data) => {
        setFilterReqData({...filterReqData, 'type': data.value})
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
                <Table.Cell><b>{quotation.quotNumber}</b></Table.Cell>
                <Table.Cell>{quotation.code}</Table.Cell>
                <Table.Cell>{quotation.title}</Table.Cell>
                <Table.Cell>{quotation.created_at}</Table.Cell>
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

    const filterWithParams = () => {
        let filterData = [];

        try{
            if (filterReqData.type === 'QUOTATION_NUMBER'){
                filterData = tempQuotations.filter(function (i){
                    return i.quotNumber.includes(filterReqData.searchParam)
                });
            } else if (filterReqData.type === 'TITLE'){
                filterData = tempQuotations.filter(function (i){
                    return i.title.includes(filterReqData.searchParam)
                });
            } else if (filterReqData.type === 'CLIENT_CODE'){
                filterData = tempQuotations.filter(function (i){
                    return i.code.includes(filterReqData.searchParam)
                });
            } else if (filterReqData.type === 'CREATED_DATE'){
                filterData = tempQuotations.filter(function (i){
                    return i.created_at.includes(filterReqData.searchParam)
                });
            } else if (filterReqData.type === 'STATUS'){
                filterData = tempQuotations.filter(function (i){
                    return i.status_name.includes(filterReqData.searchParam)
                });
            } else if (filterReqData.type === 'AMOUNT'){
                filterData = tempQuotations.filter(function (i){
                    return (""+i.amount).includes(filterReqData.searchParam)
                });
            } else {
                filterData = tempQuotations;
            }

            setQuotations(filterData);
        } catch (e) {
            setQuotations(tempQuotations);
        }
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
            <Button id='fab' circular icon='close' onClick={clearFilter} style={{
                width: '60px',
                height: '60px',
                position: 'fixed',
                right: '20px',
                bottom: '100px',
                background: '#1b1c1d',
                display: (isFilterSet ? '':'none')
            }}/>
            <Button id='fab' circular icon='filter' onClick={handleFilterModalVisibility} style={{
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
                size='tiny'
                open={confirmationModalOpen}>
                <Header icon='archive' content='Delete Confirmation'/>
                <Modal.Content>
                    <p>
                        Do you really want to remove this quotation? This will remove all associated invoices,
                        releases and other data.
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={handleConfirmationModalVisibility}>
                        <Icon name='remove'/> No
                    </Button>
                    <Button color='green' inverted onClick={handleItemDelete}>
                        <Icon name='checkmark'/> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
            <Modal
                id='modal'
                size='small'
                open={filterModalOpen}>
                <Header icon='filter' content='Filter Manager'/>
                <Modal.Content>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Select fluid label='Filter' placeholder='Filter' options={FILTER_OPTIONS}
                                         value={filterReqData.type} onChange={handleFilterTypeChange} name='filter' autoComplete="new-password"/>
                            <Form.Input fluid label='Search' placeholder='Search data' value={filterReqData.searchParam}
                                        onChange={handleFilterSearchChange} name='search' autoComplete="new-password" readOnly={filterReqData.type === ''}/>
                        </Form.Group>
                    </Form>
                    <br/>
                    <p>You have to select <b>Filter</b> & add input to <b>Search</b> before apply filter</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' inverted onClick={handleFilterModalVisibility}>
                        <Icon name='remove'/> Cancel
                    </Button>
                    <Button color='green' inverted onClick={filterData} disabled={filterReqData.type === '' || filterReqData.searchParam === ''}>
                        <Icon name='checkmark'/> Filter Data
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};


export default QuotIndex