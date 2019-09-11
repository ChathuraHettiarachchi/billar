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

function InvoiceIndex(props) {

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
                    let data = result.map(f => {
                        return {
                            item: f,
                            sent_amount: ''
                        }
                    });
                    setInvoiceList(data);
                    console.log(data);
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
      if (invoiceList[data.value].sent_amount === 0 || invoiceList[data.value].sent_amount === ''){
          alert("You must input value more than '0'");
      } else {
          let iData = invoiceList[data.value];

          if(iData.sent_amount > getRemaining(iData.item)){
              alert("You must a value lower than 'Remaining Amount'");
          } else {
              setLoading(true);
              axios.post(process.env.REACT_APP_BASE_URL + "payments/update/amount", {
                  payment: {
                      amount:(iData.sent_amount + iData.item.sent_to_client),
                      id:iData.item.payment_id
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
                    <Button primary style={{width: '100%'}} disabled={isEnable(invoice.item)} onClick={updateSentAmount} value={index}>Send</Button>
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