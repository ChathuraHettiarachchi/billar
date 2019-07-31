import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
    Button, Form,
    Grid,
    Header, Icon,
    Segment,
    Table
} from "semantic-ui-react";
import Loader from "react-loader-spinner";
import axios from 'axios';
import Moment from 'moment';
import COUNTRY_OPTIONS from "../../../assets/data/countriesData";

const QuotIndex = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [quotations, setQuotations] = useState([]);
    const [statusList, setStatusList] = useState([]);

    useEffect(() => {
        const fetchData = () => {

            axios.all([
                axios.get('http://localhost:4000/quotations/'),
                axios.get('http://localhost:4000/status/')
            ]).then(axios.spread((quotations, statusList) => {
                let quots = quotations.data.content.quotations;
                let statusData = statusList.data.content.status_list;

                let statusForSelect = statusData.map(status => {
                    return {
                        "text": status.title,
                        "key": status.status_id,
                        "value": status.status_id
                    }
                });

                setQuotations(quots);
                setStatusList(statusForSelect);
            })).then(() => {
                setLoading(false);
            }).catch(error => {
                console.log(error);
                setLoading(false);
            });
        };


        fetchData();
    }, []);

    const handleConfirmation = e => {
        const r = window.confirm("Do you really want to remove this quotation?");
        if (r == true) {
            axios.delete('http://localhost:4000/quotations/remove/' + e.target.value)
                .then(res => {
                    console.log(res);
                    window.location.reload()
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        }
    };

    const onQuotationStateChange = (event, index, rowValue) => {
        console.log(index.value);
        console.log(index['data-id']);

        const _tempQuotations = [...quotations];
        _tempQuotations[index['data-id']]['status'] = index.value;

        setQuotations(_tempQuotations);

        setLoading(true);
        axios.post(('http://localhost:4000/quotations/update/'+quotations[index['data-id']].quotation_id+'/status'), {
            quotation: {
                status: index.value
            }
        }).then(res => {
            console.log(res);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false);
        });
    };

    const getTableData = quotations => {
        return quotations.map((quotation, index) =>
            <Table.Row key={index}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>#{(Moment(quotation.created_at).format('YYYYMM') + '100' + quotation.quotation_id)}</Table.Cell>
                <Table.Cell>{quotation.code}</Table.Cell>
                <Table.Cell>{quotation.title}</Table.Cell>
                <Table.Cell>{new Date(quotation.created_at).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                    <Form>
                        <Form.Select
                            fluid
                            options={statusList}
                            value={parseInt(quotation.status)}
                            onChange={onQuotationStateChange}
                            name='status'
                            data-id={index}
                        />
                    </Form>
                </Table.Cell>
                <Table.Cell>{quotation.amount}</Table.Cell>
                <Table.Cell>
                    <Button size="mini" icon color="green" as={Link}
                            to={'/quotation/step2/' + quotation.client_id + '/view/' + quotation.quotation_id}>
                        <Icon name="desktop"/>
                    </Button>
                    <Button size="mini" icon color="blue" as={Link}
                            to={'/quotation/step2/' + quotation.client_id + '/edit/' + quotation.quotation_id}>
                        <Icon name="pencil"/>
                    </Button>
                    <Button color="red" size="mini" icon onClick={handleConfirmation} value={quotation.quotation_id}
                            key={quotation.quotation_id}>
                        <Icon name="delete"/>
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    };

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
        tableContent =
            <Table compact celled>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell width={1}>No.</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Quotation No.</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Client Code</Table.HeaderCell>
                        <Table.HeaderCell width={3}>Title</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Created At</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Status</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Amount</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {getTableData(quotations)}
                </Table.Body>
            </Table>

    }


    return (
        <div>
            <Segment>
                <Grid style={{minHeight: '0'}}>
                    <Grid.Row>
                        <Grid.Column width={4} floated='left' verticalAlign='middle'>
                            <Header>Quotations</Header>
                        </Grid.Column>
                        <Grid.Column width={4} floated='right'>
                            <Button primary floated='right' as={Link} to={'/quotation/step1'}>Add New Quotation</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment>
                {tableContent}
            </Segment>
        </div>
    );
}


export default QuotIndex