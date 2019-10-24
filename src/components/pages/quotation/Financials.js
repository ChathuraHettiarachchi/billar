import React, {useState, useEffect} from 'react';
import {
    Grid, Header, Table, Button, Icon, Form
} from "semantic-ui-react";

import TableHeader from "./TableHeader";
import './Quotation.css'
import {Link} from "react-router-dom";

const Financials = ({onFinanceDataChange, pageType, data, total, deleted}) => {

    const [financeData, setFinanceData] = useState(data);
    const [readOnly, setReadOnly] = useState(pageType === 'view');

    useEffect(() => {
        setFinanceData(data)
    }, []);


    const onNewRecord = () => {
        setFinanceData(prevCosts => [...financeData, {id: -1,description: '', amount: ''}]);
    };

    const handleFinaceItemChange = event => {
        const _tempFinances = [...financeData];
        _tempFinances[event.target.dataset.id][event.target.name] = event.target.value;
        setFinanceData(_tempFinances);

        onFinanceDataChange(_tempFinances)
    };

    const getTotalCosts = () => {
        const totalAmount = financeData.reduce((total, item) => {
            return total + Number(item.amount);
        }, 0);

        total(totalAmount);
        return totalAmount
    };

    const handleFinaceItemRemove = (event, data) => {
        const _tempFinances = [...financeData];

        let removingItem = _tempFinances[data.value];
        if(removingItem.id > 0){
            deleted(removingItem.id)
        }

        _tempFinances.splice(data.value, 1);
        setFinanceData(_tempFinances);

        onFinanceDataChange(_tempFinances)
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
                        style={{height: '35px', width: '100%'}}
                        placeholder='Description'
                        readOnly={readOnly}
                    />
                </Table.Cell>
                <Table.Cell>
                    <input
                        name="amount"
                        data-id={index}
                        value={data.amount}
                        onChange={handleFinaceItemChange}
                        style={{height: '35px', width: '100%'}}
                        placeholder='Amount'
                        type='number'
                        readOnly={readOnly}
                    />
                </Table.Cell>
                {(readOnly === true ? <></>: <Table.Cell>
                    <Button color='red' circular floated='right' icon='remove' value={index}
                            onClick={handleFinaceItemRemove} disabled={readOnly}/>
                </Table.Cell>)}
            </Table.Row>
        );
    };

    let header_content;
    if (readOnly) {
        header_content =
            <Table.Row>
                <Table.HeaderCell width={1}>No</Table.HeaderCell>
                <Table.HeaderCell width={10}>Description</Table.HeaderCell>
                <Table.HeaderCell width={5}>Amount(USD)</Table.HeaderCell>
            </Table.Row>
    } else {
        header_content =
            <Table.Row>
                <Table.HeaderCell width={1}>No</Table.HeaderCell>
                <Table.HeaderCell width={10}>Description</Table.HeaderCell>
                <Table.HeaderCell width={4}>Amount(USD)</Table.HeaderCell>
                <Table.HeaderCell width={1}> </Table.HeaderCell>
            </Table.Row>
    }

    return (
        <div id='finance'>
            <Header as='h1' style={{color: "#1579D0"}}>Financials</Header>
            <TableHeader title='Financial Details'/>

            <Table celled>
                <Table.Header>
                    {header_content}
                </Table.Header>

                <Table.Body>
                    {getTableData(financeData)}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell style={{backgroundColor: '#C9DEF1'}}> </Table.HeaderCell>
                        <Table.HeaderCell verticalAlign='middle'
                                          style={{backgroundColor: '#C9DEF1'}}><b>TOTAL</b></Table.HeaderCell>
                        <Table.HeaderCell
                            style={{backgroundColor: '#C9DEF1'}}><b>{getTotalCosts()}</b></Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
            <br/>
            {(readOnly === true ? <></> : <Button secondary circular floated='right' icon='add' onClick={onNewRecord}
                                                  style={{marginRight: '10px'}} disabled={readOnly}/>)}
        </div>
    );
};

export default Financials