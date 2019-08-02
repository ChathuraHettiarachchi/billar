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
            axios.get(process.env.REACT_APP_BASE_URL + 'releases/all')
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
                    <Grid.Row style={{height: '90px'}}>
                        <Grid.Column width={4} floated='left' verticalAlign='middle'>
                            <Header>Releases</Header>
                        </Grid.Column>
                        <Grid.Column width={4} floated='right'>
                            <div className="row-rel">
                                <div className="column-rel-indicator">
                                    <div id="color_box_wrapper">
                                        <div id="color_box" className="passed"/>
                                        <pre id="color_text"> Completed</pre>
                                    </div>
                                    <div id="color_box_wrapper">
                                        <div id="color_box" className="next-week"/>
                                        <pre id="color_text"> Next week</pre>
                                    </div>
                                </div>
                                <div className="column-rel-indicator">
                                    <div id="color_box_wrapper">
                                        <div id="color_box" className="this-week"/>
                                        <pre id="color_text"> This week</pre>
                                    </div>
                                    <div id="color_box_wrapper">
                                        <div id="color_box" className="other"/>
                                        <pre id="color_text"> Future</pre>
                                    </div>
                                </div>
                            </div>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            {tableContent}
        </div>
    );
}


export default ReleasesIndex