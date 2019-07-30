import React, {useState} from 'react';
import {
    Grid, Header, Table, Button, Icon, Form
} from "semantic-ui-react";

import TableHeader from "./TableHeader";
import './Quotation.css'
import {Link} from "react-router-dom";

const Financials = () => {

    const [financeData, setFinanceData] = useState([]);

    const onNewRecord = () => {
        setFinanceData(prevCosts => [...financeData, { description:'', amount: '' }]);
    };

    const handleFinaceItemChange = event => {
        const _tempFinances = [...financeData];
        _tempFinances[event.target.dataset.id][event.target.name] = event.target.value;
        setFinanceData(_tempFinances);
    };

    const getTotalCosts = () => {
        return financeData.reduce((total, item) => {
            return total + Number(item.amount);
        }, 0);
    };

    const handleFinaceItemRemove = event => {
        const _tempFinances = [...financeData];
        _tempFinances.splice(event.target.dataset.id, 1);
        setFinanceData(_tempFinances);
    };

    const getTableData = financeData => {
        return financeData.map((data, index) =>
            <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                    <input
                        name="description"
                        data-id={index}
                        value={data.description}
                        onChange={handleFinaceItemChange}
                        style={{height:'35px', width:'100%'}}
                        placeholder='Description'
                    />
                </Table.Cell>
                <Table.Cell>
                    <input
                        name="amount"
                        data-id={index}
                        value={data.amount}
                        onChange={handleFinaceItemChange}
                        style={{height:'35px', width:'100%'}}
                        placeholder='Amount'
                        type='number'
                    />
                </Table.Cell>
                <Table.Cell>
                    <Button secondary circular floated='right' icon='remove' value={index} onClick={handleFinaceItemRemove}/>
                </Table.Cell>
            </Table.Row>
        );
    };

    return (
        <div id='finance'>
            <Header as='h1' style={{color: "#1579D0"}}>Financials</Header>
            <TableHeader title='Financial Details'/>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>No</Table.HeaderCell>
                        <Table.HeaderCell width={10}>Description</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Amount(USD)</Table.HeaderCell>
                        <Table.HeaderCell width={1}> </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {getTableData(financeData)}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell style={{backgroundColor: '#C9DEF1'}}> </Table.HeaderCell>
                        <Table.HeaderCell verticalAlign='middle'
                                          style={{backgroundColor: '#C9DEF1'}}><b>TOTAL</b></Table.HeaderCell>
                        <Table.HeaderCell style={{backgroundColor: '#C9DEF1'}}><b>{getTotalCosts()}</b></Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
            <br/>
            <Button secondary circular floated='right' icon='add' onClick={onNewRecord}/>
        </div>
    );
};

export default Financials