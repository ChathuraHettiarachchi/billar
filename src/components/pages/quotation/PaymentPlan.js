import React, {useState} from 'react';
import {
    Button,
    Header, Table
} from "semantic-ui-react";

import TableHeader from "./TableHeader";

import './Quotation.css'

function PaymentPlan() {
    const [paymentData, setPaymentData] = useState([]);

    const onNewRecord = () => {
        let date = Date.now().toLocaleString();
        setPaymentData(prev => [...paymentData, { description:'', invoicing_date: date, amount:'' }]);
    };

    const handleReleaseItemChange = event => {
        const _tempPayments = [...paymentData];
        _tempPayments[event.target.dataset.id][event.target.name] = event.target.value;
        setPaymentData(_tempPayments);
        console.log(paymentData)
    };

    const handleReleaseItemRemove = event => {
        const _tempPayments = [...paymentData];
        _tempPayments.splice(event.target.dataset.id, 1);
        setPaymentData(_tempPayments);
    };

    const getTableData = paymentData => {
        return paymentData.map((data, index) =>
            <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                    <input
                        name="description"
                        data-id={index}
                        value={data.description}
                        onChange={handleReleaseItemChange}
                        style={{height:'35px', width:'100%'}}
                        placeholder='Description'
                    />
                </Table.Cell>
                <Table.Cell>
                    <input
                        name="invoicing_date"
                        data-id={index}
                        value={data.invoicing_date}
                        onChange={handleReleaseItemChange}
                        style={{height:'35px', width:'100%'}}
                        type='date'
                        placeholder='Invoice Date'
                    />
                </Table.Cell>
                <Table.Cell>
                    <input
                        name="amount"
                        data-id={index}
                        value={data.amount}
                        onChange={handleReleaseItemChange}
                        style={{height:'35px', width:'100%'}}
                        placeholder='Amount'
                        type='number'
                    />
                </Table.Cell>
                <Table.Cell>
                    <Button secondary circular floated='right' icon='remove' value={index} onClick={handleReleaseItemRemove}/>
                </Table.Cell>
            </Table.Row>
        );
    };

    return (
        <div id='finance'>
            <Header as='h1' style={{color: "#1579D0"}}>Payment Plan</Header>
            <TableHeader title='Invoicing Plan'/>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>No</Table.HeaderCell>
                        <Table.HeaderCell width={8}>Description</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Invoice Date</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Amount(USD)</Table.HeaderCell>
                        <Table.HeaderCell width={1}> </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {getTableData(paymentData)}
                </Table.Body>
            </Table>
            <br/>
            <Button secondary circular floated='right' icon='add' onClick={onNewRecord} style={{marginRight:'10px'}}/>
        </div>
    );
}

export default PaymentPlan