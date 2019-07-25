import React, {useState} from 'react';
import {
    Header, Table
} from "semantic-ui-react";

import TableHeader from "./TableHeader";

import './Quotation.css'

function PaymentPlan() {
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
                        <Table.HeaderCell width={3}>Amount(USD)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>John</Table.Cell>
                        <Table.Cell>Approved</Table.Cell>
                        <Table.Cell>None</Table.Cell>
                        <Table.Cell>None</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jamie</Table.Cell>
                        <Table.Cell>Approved</Table.Cell>
                        <Table.Cell>Requires call</Table.Cell>
                        <Table.Cell>Requires call</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jill</Table.Cell>
                        <Table.Cell>Denied</Table.Cell>
                        <Table.Cell>None</Table.Cell>
                        <Table.Cell>None</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}

export default PaymentPlan