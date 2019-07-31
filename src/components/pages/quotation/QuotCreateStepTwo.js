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
import Moment from 'moment';

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


const QuotCreateStepOne = (props) => {

    const [pageType, setPageType] = useState(((props.location.pathname).split("/"))[4]);
    const [readOnly, setReadOnly] = useState(pageType === 'view');
    const [isLoading, setLoading] = useState(true);
    const [clientId, setClientId] = useState(((props.location.pathname).split("/"))[3]);
    const [quotationId, setQuotationId] = useState(
        (((props.location.pathname).split("/")).length === 6) ? ((props.location.pathname).split("/"))[5] : ''
    );

    const [totalAmount, setTotalAmount] = useState('');
    const [terms, setTerms] = useState('');
    const [financials, setFinancials] = useState([]);
    const [releasePlans, setReleasePlans] = useState([]);
    const [paymentPlans, setPaymentPlans] = useState([]);

    const [quotationData, setQuotationData] = useState({
        title: '',
        description: '',
        created_at: Moment(new Date()).format('DD - MMMM - YYYY'),
        updated_at: Moment(new Date()).format('DD - MMMM - YYYY'),
        quot_no: '#New'
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
            const fetchData = () => {
                console.log(pageType);
                axios.all([
                    axios.get('http://localhost:4000/clients/' + clientId),
                    axios.get('http://localhost:4000/quotations/' + quotationId),
                    axios.get('http://localhost:4000/financials/quotation/' + quotationId),
                    axios.get('http://localhost:4000/releases/quotation/' + quotationId),
                    axios.get('http://localhost:4000/payments/quotation/' + quotationId)
                ]).then(axios.spread((clientInfo, quotationInfo, financeInfo, releaseInfo, paymentInfo) => {
                    let client = clientInfo.data.content.clients;
                    setClient(client);

                    let quot = quotationInfo.data.content.quotations;
                    let terms = quot.terms;
                    setTerms(terms);

                    setTotalAmount(quot.amount);
                    setQuotationData({
                        ...quotationData,
                        title: quot.title,
                        description: quot.description,
                        created_at: Moment(quot.created_at).format('DD - MMMM - YYYY'),
                        updated_at: Moment(quot.updated_at).format('DD - MMMM - YYYY'),
                        quot_no: (Moment(quot.created_at).format('YYYYMM')+'100'+quot.quotation_id)
                    });

                    let financeData = financeInfo.data.content.financials.map(f => {
                        return {
                            description: f.description,
                            amount: f.amount
                        }
                    });

                    let releaseData = releaseInfo.data.content.releases.map(r => {
                        return {
                            description: r.description,
                            release_date: (new Date(r.release_date).toISOString().slice(0, 10)),
                        }
                    });

                    let paymentData = paymentInfo.data.content.payments.map(p => {
                        return {
                            description: p.description,
                            invoice_date: (new Date(p.invoice_date).toISOString().slice(0, 10)),
                            amount: p.amount
                        }
                    });

                    setFinancials(financeData);
                    setReleasePlans(releaseData);
                    setPaymentPlans(paymentData);
                })).then(() => {
                    console.log(quotationData);
                    setLoading(false);
                }).catch(error => {
                    console.log(error);
                    setLoading(false);
                });
            };

            fetchData();
        }
    }, []);

    const onFinanceDataChange = (data) => {
        setFinancials(data);
        setTotalAmount(
            financials.reduce((total, item) => {
                return total + Number(item.amount);
            }, 0));
    };

    const onReleasePlanDataChange = (data) => {
        setReleasePlans(data);
    };

    const onPaymentPlanDataChange = (data) => {
        setPaymentPlans(data);
    };

    const onTermsChange = (data) => {
        setTerms(data);
        console.log('on terms change:' + data)
    };

    const handleQuotationData = e => {
        const {name, value} = e.target;
        setQuotationData({...quotationData, [name]: value});

        console.log(quotationData)
    };

    const quotationObject = {
        title: quotationData.title,
        description: quotationData.description,
        amount: totalAmount,
        terms: terms,
        client_id: client.client_id,
        status: '',
        financials: financials,
        releases: releasePlans,
        payments: paymentPlans
    };

    const createQuotation = e => {
        setLoading(true);

        axios.post('http://localhost:4000/quotations/new', {
            quotation: quotationObject
        }).then(res => {
            console.log(res);
            setLoading(false);
            props.history.push('/quotation/index');
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    };

    const downloadAsPDF = e => {
        console.log('Downloading as PDF')
    };

    const updateQuotation = e => {
        console.log('Update Quotation')
    };

    let actionButton;
    if (pageType === 'view') {
        actionButton = <Button primary floated='right' onClick={downloadAsPDF}>Download as PDF</Button>
    } else if (pageType === 'edit') {
        actionButton = <Button primary floated='right' onClick={updateQuotation}>Update Quotation</Button>
    } else {
        actionButton = <Button primary floated='right' onClick={createQuotation}>Create Quotation</Button>
    }

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
                <QuotationInfo createdDate={quotationData.created_at} updatedDate={quotationData.updated_at} no={quotationData.quot_no}/>
                <br/>
                <Form>
                    <Form.TextArea rows={2} placeholder='Project title' maxLength='100' name='title'
                                   value={quotationData.title} onChange={handleQuotationData}
                                   style={{color: "#3371B1", fontSize: "2em", margin: '20px 0px 20px 0px'}}
                                   readOnly={readOnly}/>
                    <hr/>
                    <Header as='h1' style={{color: "#1579D0"}}>Scope of Work</Header>
                    <Form.TextArea placeholder='Scope of Work' rows={4} name='description'
                                   value={quotationData.description} onChange={handleQuotationData}
                                   style={{marginBottom: '20px'}} readOnly={readOnly}/>
                </Form>

                <br/>
                <Financials onFinanceDataChange={onFinanceDataChange} pageType={pageType} data={financials}/>
                <br/>
                <br/>
                <ReleasePlan onReleasePlanDataChange={onReleasePlanDataChange} pageType={pageType} data={releasePlans}/>
                <br/>
                <br/>
                <PaymentPlan onPaymentPlanDataChange={onPaymentPlanDataChange} pageType={pageType} data={paymentPlans}/>
                <br/>
                <br/>
                <Terms onTermsChange={onTermsChange} pageType={pageType} data={terms}/>
                <Grid style={{minHeight: '40px', padding: '0rem !important'}}>
                    <Grid.Column id='create_quot_button' width={16} floated='right'>
                        {actionButton}
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