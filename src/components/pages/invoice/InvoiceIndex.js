import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Grid,
    Header, Icon,
    Segment,
    Table
} from "semantic-ui-react";
import axios from "axios";
import Loader from "react-loader-spinner";
import Moment from "moment";

function InvoiceIndex() {

    const [invoiceList, setInvoiceList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            axios.get(process.env.REACT_APP_BASE_URL + 'payments/all')
                .then(res => {
                    setLoading(false);
                    return res.data.content.payments
                })
                .then(result => {
                    setInvoiceList(result);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        };

        fetchData();
    }, []);

    const getRemaining = invoice => {
        let amount = (invoice.sent_to_client == null ? 0 : invoice.sent_to_client)
        return (invoice.amount - amount)
    };

    const isEnable = invoice => {
        return getRemaining(invoice) === 0;
    };

    const getTableData = invoiceList => {
        return invoiceList.map((invoice, index) =>
            <Table.Row key={invoice.payment_id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{(Moment(invoice.quotation_created_at).format('YYYYMM') + '00' + invoice.quotation_id)}</Table.Cell>
                <Table.Cell>{invoice.client_code}</Table.Cell>
                <Table.Cell>{(Moment(invoice.invoice_date).format('YYYY-MMM-DD'))}</Table.Cell>
                <Table.Cell>{invoice.amount}</Table.Cell>
                <Table.Cell>{(invoice.sent_to_client == null ? 0 : invoice.sent_to_client)}</Table.Cell>
                <Table.Cell>{getRemaining(invoice)}</Table.Cell>
                <Table.Cell>
                    <input type='number'
                           style={{width: '100%'}}
                           readOnly={isEnable(invoice)}
                           min='0'
                           max={getRemaining(invoice)}
                    />
                </Table.Cell>
                <Table.Cell>
                    <Button primary style={{width: '100%'}} disabled={isEnable(invoice)}>Send</Button>
                </Table.Cell>
            </Table.Row>
        );
    };


    let totalAmount = invoiceList.reduce((a, b) => {
        return (a + (b.sent_to_client === null ? 0 : b.sent_to_client));
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
                    <Loader type="Plane" color="blue" height="100" width="100"/>
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
                <Grid style={{minHeight: '0'}}>
                    <Grid.Row>
                        <Grid.Column width={1} floated='left' verticalAlign='middle'>
                            <h5>From :</h5>
                        </Grid.Column>
                        <Grid.Column width={6} floated='left' verticalAlign='middle'>
                            <div className="block">
                                <input
                                    name="from"
                                    style={{height: '35px', width: '100%'}}
                                    type='date'
                                    placeholder='From'
                                />
                            </div>

                        </Grid.Column>
                        <Grid.Column width={1} floated='left' verticalAlign='middle'>
                            <h5>To :</h5>
                        </Grid.Column>
                        <Grid.Column width={6} floated='left' verticalAlign='middle'>
                            <div className="block">
                                <input
                                    name="from"
                                    style={{height: '35px', width: '100%'}}
                                    type='date'
                                    placeholder='From'
                                />
                            </div>
                        </Grid.Column>
                        <Grid.Column width={2} floated='left' verticalAlign='middle'>
                            <Button primary style={{width: '100%'}} icon='search'/>
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


export default InvoiceIndex