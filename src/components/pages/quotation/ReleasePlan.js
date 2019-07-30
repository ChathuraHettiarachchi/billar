import React, {useState} from 'react';
import {
    Grid, Header, Table
} from "semantic-ui-react";

import TableHeader from "./TableHeader";

import './Quotation.css'

function ReleasePlan() {
    return (
        <div id='finance'>
            <Header as='h1' style={{color: "#1579D0"}}>Release Plan</Header>
            <TableHeader title='Financial Details'/>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={2}>No</Table.HeaderCell>
                        <Table.HeaderCell width={10}>Description</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Amount(USD)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>John</Table.Cell>
                        <Table.Cell>Approved</Table.Cell>
                        <Table.Cell>None</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jamie</Table.Cell>
                        <Table.Cell>Approved</Table.Cell>
                        <Table.Cell>Requires call</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jill</Table.Cell>
                        <Table.Cell>Denied</Table.Cell>
                        <Table.Cell>None</Table.Cell>
                    </Table.Row>
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell style={{backgroundColor:'#C9DEF1'}}> </Table.HeaderCell>
                        <Table.HeaderCell verticalAlign='middle' style={{backgroundColor:'#C9DEF1'}}>TOTAL</Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor:'#C9DEF1'}}> </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    );
}

export default ReleasePlan