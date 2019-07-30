import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
    Header,
    Segment,
    Form,
    Button,
    Grid,
    Image
} from "semantic-ui-react";

import AddressSection from './AddressSection'
import QuotationInfo from './QuotationInfo'
import Financials from './Financials'
import ReleasePlan from './ReleasePlan'
import PaymentPlan from './PaymentPlan'
import Terms from './Terms'

import fidenz from '../../../assets/images/fidenz.png'
import quotation from '../../../assets/images/quotation.png'
import axios from "axios";
import Loader from "react-loader-spinner";
import COUNTRY_OPTIONS from "../../../assets/data/countriesData";


const QuotCreateStepOne = (props) => {

    const [pageType, setPageType] = useState(((props.location.pathname).split("/"))[4]);
    const [isLoading, setLoading] = useState(true);
    const [clientId, setClientId] = useState(((props.location.pathname).split("/"))[3]);

    //add amount to first body
    //add client id to first body

    const [financials, setFinancials] = useState([]);
    const [releasePlans, setReleasePlans] = useState([]);
    const [paymentPlans, setPaymentPlans] = useState([]);
    const [quotationData, setQuotationData] = useState({
        title: '',
        description: '',
        terms: '',
        status: '',
    });
    const [client, setClient] = useState({});

    useEffect(() => {
        if (pageType === 'new') {
            const fetchData = () => {
                axios.get('http://localhost:4000/clients/' + clientId)
                    .then(res => {
                        setLoading(false);

                        let content = res.data.content.clients;
                        setClient(content);
                    })
                    .catch(error => {
                        console.log(error);
                        setLoading(false);
                    });
            };

            fetchData();
        } else if (pageType === 'view' || pageType === 'edit') {
            // const fetchData = () => {
            //     console.log(pageType)
            //     axios.get('http://localhost:4000/status/' + status.status_id)
            //         .then(res => {
            //             console.log(res.data);
            //             setLoading(false);
            //
            //             let content = res.data.content.status;
            //
            //             if (pageType === 'view') {
            //                 setTitle("'" + content.name + "' Info");
            //             } else {
            //                 setTitle("Edit '" + content.name + "' Info");
            //             }
            //
            //             setStatus({
            //                 ...status,
            //                 title: content.title,
            //                 color: content.color
            //             });
            //         })
            //         .catch(error => {
            //             console.log(error);
            //             setLoading(false);
            //         });
            // };
            //
            // fetchData();
        }
    }, []);

    let content;
    if (isLoading) {
        content =
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
        content = <Segment style={{padding: '50px'}}>
            <Grid style={{minHeight: '90px'}}>
                <Grid.Column width={4}>
                    <Image src={fidenz} style={{height: '60px'}}/>
                </Grid.Column>
                <Grid.Column width={8}/>
                <Grid.Column width={4}>
                    <Image src={quotation} style={{height: '60px'}} floated='right'/>
                </Grid.Column>
            </Grid>
            <div style={{padding: '8px'}}>
                <AddressSection client={client}/>
                <QuotationInfo/>
                <br/>
                <Form>
                    <Form.TextArea rows={2} placeholder='Project title' maxLength='100'
                                   style={{color: "#3371B1", fontSize: "2em", margin: '20px 0px 20px 0px'}}/>
                    <hr/>
                    <Header as='h1' style={{color: "#1579D0"}}>Scope of Work</Header>
                    <Form.TextArea placeholder='Scope of Work' rows={4} style={{marginBottom: '20px'}}/>
                </Form>

                <br/>
                <Financials/>
                <br/>
                <br/>
                <ReleasePlan/>
                <br/>
                <br/>
                <PaymentPlan/>
                <br/>
                <br/>
                <Terms/>
                <Grid style={{minHeight: '40px', padding: '0rem !important'}}>
                    <Grid.Column id='create_quot_button' width={16} floated='right'>
                        <Button primary floated='right'> Create Quotation</Button>
                    </Grid.Column>
                </Grid>
            </div>
        </Segment>

    }

    return (
        <div id='quotation'>
            {content}
        </div>
    );
};


export default QuotCreateStepOne