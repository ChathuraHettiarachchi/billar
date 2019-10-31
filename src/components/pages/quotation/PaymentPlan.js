import React, {useState, useEffect} from 'react';
import {
    Button,
    Header, Table
} from "semantic-ui-react";

import TableHeader from "./TableHeader";

import './Quotation.css'

function PaymentPlan({onPaymentPlanDataChange, pageType, data, deleted}) {

    const [paymentData, setPaymentData] = useState(data);
    const [readOnly, setReadOnly] = useState(pageType === 'view');

    useEffect(() => {
        setPaymentData(data);
    }, []);

    const onNewRecord = () => {
        let date = Date.now().toLocaleString();
        setPaymentData(prev => [...paymentData, {description: '', invoice_date: date, amount: ''}]);
    };

    const handleReleaseItemChange = event => {
        const _tempPayments = [...paymentData];
        _tempPayments[event.target.dataset.id][event.target.name] = event.target.value;
        setPaymentData(_tempPayments);
        console.log(paymentData);

        onPaymentPlanDataChange(_tempPayments);
    };

    const handleReleaseItemRemove = (event, data) => {
        const _tempPayments = [...paymentData];

        let removingItem = _tempPayments[data.value];
        if(removingItem.id  > -1){
            deleted(removingItem.id)
        }

        _tempPayments.splice(data.value, 1);
        setPaymentData(_tempPayments);

        onPaymentPlanDataChange(_tempPayments);
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
                        style={{height: '35px', width: '100%'}}
                        placeholder='Description'
                        readOnly={readOnly}
                    />
                </Table.Cell>
                <Table.Cell>
                    <input
                        name="invoice_date"
                        data-id={index}
                        value={data.invoice_date}
                        onChange={handleReleaseItemChange}
                        style={{height: '35px', width: '100%'}}
                        type='date'
                        placeholder='Invoice Date'
                        readOnly={readOnly}
                    />
                </Table.Cell>
                <Table.Cell>
                    <input
                        name="amount"
                        data-id={index}
                        value={data.amount}
                        onChange={handleReleaseItemChange}
                        style={{height: '35px', width: '100%'}}
                        placeholder='Amount'
                        type='number'
                        readOnly={readOnly}
                    />
                </Table.Cell>
                {(readOnly === true ? <></> : <Table.Cell>
                    <Button color='red' circular floated='right' icon='remove' value={index}
                            onClick={handleReleaseItemRemove} disabled={readOnly}/>
                </Table.Cell>)}
            </Table.Row>
        );
    };

    let header_content;
    if (readOnly) {
        header_content =
            <Table.Row>
                <Table.HeaderCell width={1}>No</Table.HeaderCell>
                <Table.HeaderCell width={9}>Description</Table.HeaderCell>
                <Table.HeaderCell width={4}>Invoice Date</Table.HeaderCell>
                <Table.HeaderCell width={2}>Amount(USD)</Table.HeaderCell>
            </Table.Row>
    } else {
        header_content =
            <Table.Row>
                <Table.HeaderCell width={1}>No</Table.HeaderCell>
                <Table.HeaderCell width={8}>Description</Table.HeaderCell>
                <Table.HeaderCell width={4}>Invoice Date</Table.HeaderCell>
                <Table.HeaderCell width={2}>Amount(USD)</Table.HeaderCell>
                <Table.HeaderCell width={1}> </Table.HeaderCell>
            </Table.Row>
    }

    return (
        <div id='finance'>
            <Header as='h1' style={{color: "#1579D0"}}>Payment Plan</Header>
            <TableHeader title='Invoicing Plan'/>

            <Table celled>
                <Table.Header>
                    {header_content}
                </Table.Header>

                <Table.Body>
                    {getTableData(paymentData)}
                </Table.Body>
            </Table>
            <br/>
            {(readOnly === true ? <></> : <Button secondary circular floated='right' icon='add' onClick={onNewRecord}
                                                  style={{marginRight: '10px'}}
                                                  disabled={readOnly}/>)}
        </div>
    );
}

export default PaymentPlan