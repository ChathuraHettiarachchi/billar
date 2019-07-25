import React from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Grid,
    Header,
    Segment,
    Table
} from "semantic-ui-react";

function QuotIndex() {
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
                <Table compact celled>
                    <Table.Header fullWidth>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Quot. No.</Table.HeaderCell>
                            <Table.HeaderCell>Client</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Status</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Amount</Table.HeaderCell>
                            <Table.HeaderCell width={4}>Title</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan={5} />
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Segment>
        </div>
    );
}



export default QuotIndex