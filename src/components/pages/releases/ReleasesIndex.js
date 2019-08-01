import React, {useEffect, useState} from 'react';
import {
    Button,
    Grid,
    Header, Icon,
    Segment, Table
} from "semantic-ui-react";
import './Release.css'
import ReleaseRow from './ReleaseRow'
import axios from "axios";
import {Link} from "react-router-dom";

function ReleasesIndex() {

    const [releaseList, setReleaseList] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:4000/releases/all')
                .then(res => {
                    setLoading(false);
                    return res.data.content.releases
                })
                .then(result => {
                    setReleaseList(groupByQuot(result));
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        };

        fetchData();
    }, []);

    const getTableData = releaseList => {
        let relData = [];
        for (let index in releaseList) {
            relData.push(
                <Segment key={index}>
                    <ReleaseRow data={releaseList[index]}/>
                </Segment>
            );
        }
        return relData
    };

    const groupBy = key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});

    const groupByQuot = groupBy('quotation_id');

    return (
        <div>
            <Segment>
                <Grid style={{minHeight: '0'}}>
                    <Grid.Row>
                        <Grid.Column width={4} floated='left' verticalAlign='middle'>
                            <Header>Releases</Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            {getTableData(releaseList)}
        </div>
    );
}


export default ReleasesIndex