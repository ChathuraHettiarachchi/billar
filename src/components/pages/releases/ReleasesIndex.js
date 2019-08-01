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
import Loader from "react-loader-spinner";

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
        tableContent = <div>{getTableData(releaseList)}</div>
    }

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
            {tableContent}
        </div>
    );
}


export default ReleasesIndex