import React from 'react';
import {Grid, Segment} from "semantic-ui-react";

const Home = props => (
    <div>
        <Segment>
            <h1>Billar Dashboard</h1>
        </Segment>
        <Segment>
            <h3>Task break down</h3>
            <Grid style={{minHeight:'0'}}>
                <Grid.Row>
                    <Grid.Column width={5}>
                        <ul>
                            <li>Database models
                                <ul>
                                    <li><s>Clients</s></li>
                                    <li><s>Financial data</s></li>
                                    <li><s>Payments</s></li>
                                    <li><s>Releases</s></li>
                                    <li><s>Status</s></li>
                                    <li><s>Quotations</s></li>
                                    <li style={{color:'red'}}>Users</li>
                                </ul>
                            </li>
                            <li>APIs
                                <ul>
                                    <li>APIs data validations</li>
                                    <li><s>Clients</s>
                                        <ul>
                                            <li><s>Create</s></li>
                                            <li><s>Update</s></li>
                                            <li><s>Show</s></li>
                                            <li><s>Index</s></li>
                                        </ul>
                                    </li>
                                    <li><s>Project status</s>
                                        <ul>
                                            <li><s>Create</s></li>
                                            <li><s>Update</s></li>
                                            <li><s>Show</s></li>
                                            <li><s>Index</s></li>
                                        </ul>
                                    </li>
                                    <li><s>Release</s>
                                        <ul>
                                            <li><s>Show</s></li>
                                            <li><s>Index</s></li>
                                        </ul>
                                    </li>
                                    <li><s>Invoices</s>
                                        <ul>
                                            <li><s>Show</s></li>
                                            <li><s>Index</s></li>
                                            <li style={{color:'red'}}>Set - sent to client amount</li>
                                            <li style={{color:'red'}}>Filtering data</li>
                                        </ul>
                                    </li>
                                    <li><s>Quotations</s>
                                        <ul>
                                            <li><s>Create</s></li>
                                            <li><s>Update</s></li>
                                            <li><s>Show</s></li>
                                            <li><s>Index</s></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <ul>
                            <li>Front end
                                <ul>
                                    <li><s>Quotations</s>
                                        <ul>
                                            <li><s>Create</s></li>
                                            <li><s>Update</s></li>
                                            <li><s>Show</s></li>
                                            <li><s>Index</s></li>
                                            <li style={{color:'red'}}>Download as PDF</li>
                                        </ul>
                                    </li>
                                    <li><s>Invoices</s>
                                        <ul>
                                            <li><s>Index</s></li>
                                            <li style={{color:'red'}}>Filtering</li>
                                        </ul>
                                    </li>
                                    <li><s>Releases</s>
                                        <ul>
                                            <li><s>Index</s></li>
                                        </ul>
                                    </li>
                                    <li><s>Clients</s>
                                        <ul>
                                            <li><s>Create</s></li>
                                            <li><s>Update</s></li>
                                            <li><s>Show</s></li>
                                            <li><s>Index</s></li>
                                        </ul>
                                    </li>
                                    <li><s>Project Status</s>
                                        <ul>
                                            <li><s>Create</s></li>
                                            <li><s>Update</s></li>
                                            <li><s>Show</s></li>
                                            <li><s>Index</s></li>
                                        </ul>
                                    </li>
                                    <li style={{color:'red'}}>Users
                                        <ul>
                                            <li>Create</li>
                                            <li>Update</li>
                                            <li>Show</li>
                                            <li>Index</li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <ul style={{color:'red'}}>
                            <li>Other Items
                                <ul>
                                    <li>Form validations</li>
                                    <li>User auth section</li>
                                    <li>Login page integration</li>
                                    <li>Removing client need to remove all related quotations</li>
                                    <li>Generate PDF</li>
                                    <li>Validation on Payment Plan section</li>
                                    <li>Invoices 'sent to clint' update and validation</li>
                                    <li>Invoices filtering</li>
                                    <li>Home - Dashboard</li>
                                </ul>
                            </li>
                        </ul>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    </div>
);

export default Home