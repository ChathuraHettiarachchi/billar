import React, {useState, useEffect} from 'react';
import {
    Button, Header, Table
} from "semantic-ui-react";

import TableHeader from "./TableHeader";

import './Quotation.css'

const ReleasePlan = ({onReleasePlanDataChange, pageType, data, deleted}) => {

    const [releaseData, setReleaseData] = useState(data);
    const [readOnly, setReadOnly] = useState(pageType === 'view');

    useEffect(() => {
        setReleaseData(data);
    }, []);

    const onNewRecord = () => {
        let date = Date.now().toLocaleString();
        setReleaseData(prev => [...releaseData, {description: '', release_date: date}]);
    };

    const handleReleaseItemChange = event => {
        const _tempReleases = [...releaseData];
        _tempReleases[event.target.dataset.id][event.target.name] = event.target.value;
        setReleaseData(_tempReleases);

        onReleasePlanDataChange(_tempReleases);
    };

    const handleReleaseItemRemove = (event, data) => {
        const _tempReleases = [...releaseData];

        let removingItem = _tempReleases[data.value];
        if(removingItem.id  > 0){
            deleted(removingItem.id)
        }

        _tempReleases.splice(data.value, 1);
        setReleaseData(_tempReleases);

        onReleasePlanDataChange(_tempReleases);
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
                        style={{height: '35px', width: '100%'}}
                        placeholder='Description'
                        readOnly={readOnly}
                    />
                </Table.Cell>
                <Table.Cell>
                    <input
                        name="release_date"
                        data-id={index}
                        value={data.release_date}
                        onChange={handleReleaseItemChange}
                        style={{height: '35px', width: '100%'}}
                        placeholder='Release Date'
                        type='date'
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
                <Table.HeaderCell width={10}>Description</Table.HeaderCell>
                <Table.HeaderCell width={5}>Release Date</Table.HeaderCell>
            </Table.Row>;
    } else {
        header_content =
            <Table.Row>
                <Table.HeaderCell width={1}>No</Table.HeaderCell>
                <Table.HeaderCell width={10}>Description</Table.HeaderCell>
                <Table.HeaderCell width={4}>Release Date</Table.HeaderCell>
                <Table.HeaderCell width={1}> </Table.HeaderCell>
            </Table.Row>
    }

    return (
        <div id='finance'>
            <Header as='h1' style={{color: "#1579D0"}}>Release Plan</Header>
            <TableHeader title='Invoicing Plan'/>

            <Table celled>
                <Table.Header>
                    {header_content}
                </Table.Header>

                <Table.Body>
                    {getTableData(releaseData)}
                </Table.Body>
            </Table>
            <br/>
            {(readOnly === true ? <></> : <Button secondary circular floated='right' icon='add' onClick={onNewRecord}
                                                  style={{marginRight: '10px'}}
                                                  disabled={readOnly}/>)}
        </div>
    );
};

export default ReleasePlan