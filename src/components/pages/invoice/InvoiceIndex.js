import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Form, Grid, Header, Icon, Modal, Segment, Table,} from "semantic-ui-react";
import axios from "axios";
import Loader from "react-loader-spinner";
import Moment from "moment";
import {DatesRangeInput} from 'semantic-ui-calendar-react';

import FILTER_OPTIONS from "../../../assets/data/quotationFilterOptions";

function InvoiceIndex(props) {

    const [invoiceList, setInvoiceList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [clientList, setClientList] = useState([]);
    const [quotNumberList, setQuotNumberList] = useState([]);

    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [isFilterSet, setIsFilterSet] = useState(false);
    const [filterRequestedData, setFilterRequestedData] = useState({
        datesRange: '',
        client: '',
        quotationNumber: '',
        isCompleted: false,
        isRemaining: false
    });

    useEffect(() => {
        const fetchData = () => {
            axios.get(process.env.REACT_APP_BASE_URL + 'payments/all')
                .then(res => {
                    setLoading(false);
                    return res.data.content.payments
                })
                .then(result => {
                    let data = result.map(f => {
                        return {
                            item: f,
                            sent_amount: ''
                        }
                    });

                    const resultClient = [];
                    const mapClient = new Map();
                    for (const item of data) {
                        if(!mapClient.has(item.item.client_code)){
                            mapClient.set(item.item.client_code, true);    // set any value to Map
                            resultClient.push({
                                text: item.item.client_code,
                                key: item.item.client_code,
                                value: item.item.client_code
                            });
                        }
                    }

                    const resultQuot = [];
                    const mapQuot = new Map();
                    for (const item of data) {
                        if(!mapQuot.has((Moment(item.item.quotation_created_at).format('YYYYMM') + '00' + item.item.quotation_id))){
                            mapQuot.set((Moment(item.item.quotation_created_at).format('YYYYMM') + '00' + item.item.quotation_id), true);
                            resultQuot.push({
                                text: (Moment(item.item.quotation_created_at).format('YYYYMM') + '00' + item.item.quotation_id),
                                key: (Moment(item.item.quotation_created_at).format('YYYYMM') + '00' + item.item.quotation_id),
                                value: (Moment(item.item.quotation_created_at).format('YYYYMM') + '00' + item.item.quotation_id)
                            });
                        }
                    }

                    setInvoiceList(data);
                    setClientList(resultClient);
                    setQuotNumberList(resultQuot);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        };

        fetchData();
    }, []);

    const getRemaining = invoice => {
        let amount = (invoice.sent_to_client == null ? 0 : invoice.sent_to_client);
        return (invoice.amount - amount)
    };

    const isEnable = invoice => {
        return getRemaining(invoice) === 0;
    };

    const updateSentAmount = (event, data) => {
        if (invoiceList[data.value].sent_amount === 0 || invoiceList[data.value].sent_amount === '') {
            alert("You must input value more than '0'");
        } else {
            let iData = invoiceList[data.value];

            if (iData.sent_amount > getRemaining(iData.item)) {
                alert("You must a value lower than 'Remaining Amount'");
            } else {
                setLoading(true);
                axios.post(process.env.REACT_APP_BASE_URL + "payments/update/amount", {
                    payment: {
                        amount: (iData.sent_amount + iData.item.sent_to_client),
                        id: iData.item.payment_id
                    }
                }).then(res => {
                    console.log(res);
                    setLoading(false);

                    const _tempInvoices = [...invoiceList];
                    _tempInvoices[data.value]['item']['sent_to_client'] = (iData.sent_amount + iData.item.sent_to_client);
                    _tempInvoices[data.value]['sent_amount'] = '';

                    setInvoiceList(_tempInvoices);

                    props.history.push('/invoice/index');
                }).catch(error => {
                    console.log(error);
                    setLoading(false);
                });
            }
        }
    };

    const changeSendingAmount = event => {
        const _tempInvoices = [...invoiceList];
        _tempInvoices[event.target.dataset.id][event.target.name] = parseInt(event.target.value);
        setInvoiceList(_tempInvoices);
    };

    const handleFilterModalVisibility = () => {
        setFilterModalOpen(!filterModalOpen);
    };

    const clearFilter = () => {
        setIsFilterSet(false);
        setFilterRequestedData({
            datesRange: '',
            client: '',
            quotationNumber: '',
            isCompleted: false,
            isRemaining: false
        })
    };

    const filterData = () => {
        setIsFilterSet(true);
        handleFilterModalVisibility();
    };

    const handleDateRangeChange = (event, {name, value}) => {
        setFilterRequestedData({...filterRequestedData, datesRange: value});
        applyFilterEnable();
    };

    const handleFilterClientChange = (event, data) => {
        setFilterRequestedData({...filterRequestedData, 'client': data.value});
        applyFilterEnable();
    };

    const handleFilterQuotationChange = (event, data) => {
        setFilterRequestedData({...filterRequestedData, 'quotationNumber': data.value});
        applyFilterEnable();
    };

    const handleFilterIsCompletedChange = (event, data) => {
        setFilterRequestedData({...filterRequestedData, 'isCompleted': data.checked});
        applyFilterEnable();
    };

    const handleFilterIsRemainingChange = (event, data) => {
        setFilterRequestedData({...filterRequestedData, 'isRemaining': data.checked});
        applyFilterEnable();
    };

    const applyFilterEnable = () => {
        if (filterRequestedData.datesRange.length > 0 || filterRequestedData.client.length > 0 || filterRequestedData.quotationNumber.length > 0 || filterRequestedData.isCompleted || filterRequestedData.isRemaining) {
            setIsFilterSet(true)
        } else {
            setIsFilterSet(false)
        }
        console.log(filterRequestedData);
    };

    const getTableData = invoiceList => {
        return invoiceList.map((invoice, index) =>
            <Table.Row key={invoice.item.payment_id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{(Moment(invoice.item.quotation_created_at).format('YYYYMM') + '00' + invoice.item.quotation_id)}</Table.Cell>
                <Table.Cell>{invoice.item.client_code}</Table.Cell>
                <Table.Cell>{(Moment(invoice.item.invoice_date).format('YYYY-MMM-DD'))}</Table.Cell>
                <Table.Cell>{invoice.item.amount}</Table.Cell>
                <Table.Cell>{(invoice.item.sent_to_client == null ? 0 : invoice.item.sent_to_client)}</Table.Cell>
                <Table.Cell>{getRemaining(invoice.item)}</Table.Cell>
                <Table.Cell>
                    <input type='number'
                           name='sent_amount'
                           value={invoice.sent_amount}
                           data-id={index}
                           style={{width: '100%'}}
                           readOnly={isEnable(invoice.item)}
                           min='0'
                           max={getRemaining(invoice.item)}
                           onChange={changeSendingAmount}
                    />
                </Table.Cell>
                <Table.Cell>
                    <Button primary style={{width: '100%'}} disabled={isEnable(invoice.item)} onClick={updateSentAmount}
                            value={index}>Send</Button>
                </Table.Cell>
            </Table.Row>
        );
    };

    let totalAmount = invoiceList.reduce((a, b) => {
        return (a + (b.item.sent_to_client === null ? 0 : b.item.sent_to_client));
    }, 0);

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
                        <Table.HeaderCell width={2}>Quotation</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Client</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Invoice Date</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Amount</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Sent to Client</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Remaining</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Request</Table.HeaderCell>
                        <Table.HeaderCell width={1}>Action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {getTableData(invoiceList)}
                </Table.Body>
            </Table>
    }

    return (
        <div style={{position: 'relative'}}>
            <div>
                <Segment>
                    <Grid style={{minHeight: '0'}}>
                        <Grid.Row>
                            <Grid.Column width={2} floated='left' verticalAlign='middle'>
                                <Header>Client Invoices</Header>
                            </Grid.Column>
                            <Grid.Column width={8} floated='left' verticalAlign='middle'>
                            </Grid.Column>
                            <Grid.Column width={6} floated='right' verticalAlign='middle'>
                                <Header style={{textAlign: 'right'}}>Total Amount<h1>$ {totalAmount}</h1></Header>
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
                display: (isFilterSet ? '' : 'none')
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
                size='small'
                open={filterModalOpen}>
                <Header icon='filter' content='Filter Invoices'/>
                <Modal.Content>
                    <p>You should select <b>at least one</b> filter to begin with</p>
                    <br/>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Select search fluid label='Client code' placeholder='Client' options={clientList}
                                         value={filterRequestedData.client} onChange={handleFilterClientChange}
                                         name='client'
                                         autoComplete="new-password"/>
                            <Form.Select search fluid label='Quotation number' placeholder='Quotation'
                                         options={quotNumberList}
                                         value={filterRequestedData.quotationNumber} onChange={handleFilterQuotationChange}
                                         name='quotationNumber'
                                         autoComplete="new-password"/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <DatesRangeInput
                                name="datesRange"
                                label='Invoice date range'
                                placeholder="From - To"
                                value={filterRequestedData.datesRange}
                                iconPosition="left"
                                onChange={handleDateRangeChange}
                                closable={true}
                            />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Checkbox label='Completed invoices' checked={filterRequestedData.isCompleted}
                                           onChange={handleFilterIsCompletedChange}
                                           disabled={filterRequestedData.isRemaining}
                                           name='isRemaining'/>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Checkbox label='Remaining invoices' checked={filterRequestedData.isRemaining}
                                           onChange={handleFilterIsRemainingChange}
                                           disabled={filterRequestedData.isCompleted}
                                           name='isCompleted'/>
                        </Form.Group>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' inverted onClick={handleFilterModalVisibility}>
                        <Icon name='remove'/> Cancel
                    </Button>
                    <Button color='green' inverted onClick={filterData}
                            disabled={!isFilterSet}>
                        <Icon name='checkmark'/> Filter Data
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}


export default InvoiceIndex