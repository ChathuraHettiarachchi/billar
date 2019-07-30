import React, {useState} from 'react';
import {
    Button, Header, Table
} from "semantic-ui-react";

import TableHeader from "./TableHeader";

import './Quotation.css'

const ReleasePlan = ({onReleasePlanDataChange}) => {
    const [releaseData, setReleaseData] = useState([]);

    const onNewRecord = () => {
        let date = Date.now().toLocaleString();
        setReleaseData(prev => [...releaseData, { description:'', release_date: date }]);
    };

    const handleReleaseItemChange = event => {
        const _tempReleases = [...releaseData];
        _tempReleases[event.target.dataset.id][event.target.name] = event.target.value;
        setReleaseData(_tempReleases);

        onReleasePlanDataChange(releaseData);
    };

    const handleReleaseItemRemove = event => {
        const _tempReleases = [...releaseData];
        _tempReleases.splice(event.target.dataset.id, 1);
        setReleaseData(_tempReleases);

        onReleasePlanDataChange(releaseData);
    };

    const getTableData = releaseData => {
        return releaseData.map((data, index) =>
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
                        name="release_date"
                        data-id={index}
                        value={data.release_date}
                        onChange={handleReleaseItemChange}
                        style={{height:'35px', width:'100%'}}
                        placeholder='Release Date'
                        type='date'
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
            <Header as='h1' style={{color: "#1579D0"}}>Release Plan</Header>
            <TableHeader title='Invoicing Plan'/>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={1}>No</Table.HeaderCell>
                        <Table.HeaderCell width={10}>Description</Table.HeaderCell>
                        <Table.HeaderCell width={4}>Release Date</Table.HeaderCell>
                        <Table.HeaderCell width={1}> </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {getTableData(releaseData)}
                </Table.Body>
            </Table>
            <br/>
            <Button secondary circular floated='right' icon='add' onClick={onNewRecord} style={{marginRight:'10px'}}/>
        </div>
    );
}

export default ReleasePlan