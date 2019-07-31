import React from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Grid,
    Header, Menu,
    Segment,
    Table
} from "semantic-ui-react";

function InvoiceIndex() {
    return(
      <div>
          <Segment>
              <Grid style={{minHeight:'0'}}>
                  <Grid.Row>
                      <Grid.Column width={4} floated='left' verticalAlign='middle'>
                          <Header>Invoices</Header>
                      </Grid.Column>
                  </Grid.Row>
              </Grid>
          </Segment>
          <Segment>
              <Table compact celled>
                  <Table.Header fullWidth>
                      <Table.Row>
                          <Table.HeaderCell width={1}>No.</Table.HeaderCell>
                          <Table.HeaderCell>Quotation</Table.HeaderCell>
                          <Table.HeaderCell>Client</Table.HeaderCell>
                          <Table.HeaderCell>Invoice Date</Table.HeaderCell>
                          <Table.HeaderCell>Amount</Table.HeaderCell>
                          <Table.HeaderCell>Sent to Client</Table.HeaderCell>
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



export default InvoiceIndex