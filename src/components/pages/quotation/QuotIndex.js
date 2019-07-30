import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Grid,
    Header, Icon,
    Segment,
    Table
} from "semantic-ui-react";
import Loader from "react-loader-spinner";
import axios from 'axios';

const QuotIndex = (props) => {

    const [isLoading, setLoading] = useState(true);
    const [quotations, setQuotations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:4000/quotations/');
            const json = await res.json();

            setLoading(false);
            setQuotations(json.content.quotations);
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

    const getTableData = quotations => {
        return quotations.map(quotation =>
            <Table.Row key={quotation.quotation_id}>
                <Table.Cell>{quotation.quotation_id}</Table.Cell>
                <Table.Cell>{quotation.code}</Table.Cell>
                <Table.Cell>{quotation.title}</Table.Cell>
                <Table.Cell>{new Date(quotation.created_at).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{quotation.status}</Table.Cell>
                <Table.Cell>{quotation.amount}</Table.Cell>
                <Table.Cell>
                    <Button size="mini" icon color="green" as={Link} to={'/quotation/step2/' + quotation.quotation_id + '/view'}>
                        <Icon name="desktop"/>
                    </Button>
                    <Button size="mini" icon color="blue" as={Link} to={'/quotation/step2/' + quotation.quotation_id + '/edit'}>
                        <Icon name="pencil"/>
                    </Button>
                    <Button color="red" size="mini" icon onClick={handleConfirmation} value={quotation.quotation_id} key={quotation.quotation_id}>
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
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Client Code</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Created At</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {getTableData(quotations)}
                </Table.Body>
            </Table>

    }


    return(
        <div>
            <Segment>
                <Grid style={{minHeight:'0'}}>
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