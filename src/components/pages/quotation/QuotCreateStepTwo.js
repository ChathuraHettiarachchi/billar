import React, {useEffect, useState} from 'react';
import {Button, Form, Grid, Header, Image, Segment} from "semantic-ui-react";
import {PDFDownloadLink} from '@react-pdf/renderer'
import Moment from 'moment';

import AddressSection from './AddressSection'
import QuotationInfo from './QuotationInfo'
import Financials from './Financials'
import ReleasePlan from './ReleasePlan'
import PaymentPlan from './PaymentPlan'
import QuotationFile from './QuotationFile'

import fidenz from '../../../assets/images/fidenz.png'
import quotation from '../../../assets/images/quotation.png'
import axios from "axios";
import Loader from "react-loader-spinner";

const QuotCreateStepTwo = (props) => {

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

    const [deletedFinancials, setDeletedFinancials] = useState([]);
    const [deletedReleases, setDeletedReleases] = useState([]);
    const [deletedPayments, setDeletedPayments] = useState([]);

    const [quotationData, setQuotationData] = useState({
        title: '',
        description: '',
        created_at: Moment(new Date()).format('DD - MMMM - YYYY'),
        updated_at: Moment(new Date()).format('DD - MMMM - YYYY'),
        quot_no: 'New'
    });
    const [client, setClient] = useState({});

    useEffect(() => {
        if (pageType === 'new') {
            const fetchData = () => {
                axios.get(process.env.REACT_APP_BASE_URL + 'clients/' + clientId)
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
                    axios.get(process.env.REACT_APP_BASE_URL + 'clients/' + clientId),
                    axios.get(process.env.REACT_APP_BASE_URL + 'quotations/' + quotationId),
                    axios.get(process.env.REACT_APP_BASE_URL + 'financials/quotation/' + quotationId),
                    axios.get(process.env.REACT_APP_BASE_URL + 'releases/quotation/' + quotationId),
                    axios.get(process.env.REACT_APP_BASE_URL + 'payments/quotation/' + quotationId)
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
                        quot_no: (Moment(quot.created_at).format('YYYYMM') + '00' + quot.quotation_id)
                    });

                    let financeData = [];
                    if (financeInfo.data.content != null && financeInfo.data.content.financials.length > 0) {
                        financeData = financeInfo.data.content.financials.map(f => {
                            return {
                                id: f.financial_id,
                                description: f.description,
                                amount: f.amount
                            }
                        });
                    }

                    let releaseData = [];
                    if (releaseInfo.data.content != null && releaseInfo.data.content.releases.length > 0) {
                        releaseData = releaseInfo.data.content.releases.map(r => {
                            return {
                                id: r.release_id,
                                description: r.description,
                                release_date: (new Date(r.release_date).toISOString().slice(0, 10)),
                            }
                        });
                    }

                    let paymentData = [];
                    if (paymentInfo.data.content != null && paymentInfo.data.content.payments.length > 0) {
                        paymentData = paymentInfo.data.content.payments.map(p => {
                            return {
                                id: p.payment_id,
                                description: p.description,
                                invoice_date: (new Date(p.invoice_date).toISOString().slice(0, 10)),
                                amount: p.amount
                            }
                        });
                    }

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
    };

    const onReleasePlanDataChange = (data) => {
        setReleasePlans(data);
    };

    const onPaymentPlanDataChange = (data) => {
        setPaymentPlans(data);
    };

    const handleOnTermsChange = e => {
        setTerms(e.target.value);
    };

    const onTotalChange = (data) => {
        setTotalAmount(data)
    };

    const onDeleteFinancial = (data) => {
        setDeletedFinancials([...deletedFinancials, data])
    };

    const onDeleteRelease = (data) => {
        setDeletedReleases([...deletedReleases, data])
    };

    const onDeletePayment = (data) => {
        setDeletedPayments([...deletedPayments, data])
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
        payments: paymentPlans,
        deletedItems: {
            releases: deletedReleases,
            financials: deletedFinancials,
            payments: deletedPayments
        }
    };

    const createOrUpdateQuotation = e => {
        setLoading(true);

        let url;
        if (pageType === 'new') {
            url = process.env.REACT_APP_BASE_URL + 'quotations/new'
        } else if (pageType === 'edit') {
            url = process.env.REACT_APP_BASE_URL + 'quotations/update/' + quotationId
        }

        axios.post(url, {
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

    let actionButton;
    if (pageType === 'view') {
        // actionButton = <Button primary floated='right' onClick={downloadAsPDF}>Download as PDF</Button>
        let quotName = ""+ quotationData.quot_no+"_"+client.code+".pdf";

        actionButton =
            <div style={{float:'right'}}>
                <PDFDownloadLink document={<QuotationFile quotationData={quotationData} financialData={financials} releasePlanData={releasePlans} paymentPlanData={paymentPlans} clientData={client} terms={terms}/>} fileName={quotName} className='ui primary button'>
                    {({blob, url, loading, error}) => (loading ? 'Loading document...' : 'Download Quotation as PDF')}
                </PDFDownloadLink>
            </div>
    } else if (pageType === 'edit') {
        actionButton = <Button primary floated='right' onClick={createOrUpdateQuotation}>Update Quotation</Button>
    } else {
        actionButton = <Button primary floated='right' onClick={createOrUpdateQuotation}>Create Quotation</Button>
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
                    <Loader type="Oval" color="blue" height="100" width="100"/>
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
                <QuotationInfo createdDate={quotationData.created_at} updatedDate={quotationData.updated_at}
                               no={quotationData.quot_no}/>
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
                                   style={{marginBottom: '20px'}} readOnly={readOnly} maxLength="400"/>

                    <br/>
                    <Financials onFinanceDataChange={onFinanceDataChange} pageType={pageType} data={financials}
                                total={onTotalChange} deleted={onDeleteFinancial}/>
                    <br/>
                    <br/>
                    <ReleasePlan onReleasePlanDataChange={onReleasePlanDataChange} pageType={pageType}
                                 data={releasePlans} deleted={onDeleteRelease}/>
                    <br/>
                    <br/>
                    <PaymentPlan onPaymentPlanDataChange={onPaymentPlanDataChange} pageType={pageType}
                                 data={paymentPlans} deleted={onDeletePayment}/>
                    <br/>
                    <br/>
                    <Form.TextArea rows={5} label='Terms' placeholder='Terms and Conditions'
                                   style={{marginBottom: '20px'}}
                                   name='term' value={terms} onChange={handleOnTermsChange} readOnly={readOnly}/>
                </Form>
                <Grid style={{minHeight: '40px', padding: '0rem !important'}}>
                    <Grid.Column id='create_quot_button' width={16} floated='right'>
                        {actionButton}
                    </Grid.Column>
                </Grid>
                <p hidden>{JSON.stringify(quotationObject)}</p>
            </div>
        </Segment>
    }

    return (
        <div id='quotation'>
            {content}
        </div>
    );
};


export default QuotCreateStepTwo