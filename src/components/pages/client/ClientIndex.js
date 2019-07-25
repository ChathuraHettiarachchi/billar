import React from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Grid,
    Header, Menu,
    Segment,
    Table
} from "semantic-ui-react";

function ClientIndex() {
    return(
      <div>
          <Segment>
              <Grid style={{minHeight:'0'}}>
                  <Grid.Row>
                      <Grid.Column width={2} floated='left' verticalAlign='middle'>
                          <Header>Clients</Header>
                      </Grid.Column>
                      <Grid.Column width={2} floated='right'>
                          <Button primary floated='right' as={Link} to={'/client/new'}>Add New Client</Button>
                      </Grid.Column>
                  </Grid.Row>
              </Grid>
          </Segment>
          <Segment>
              <Table compact celled>
                  <Table.Header fullWidth>
                      <Table.Row>
                          <Table.HeaderCell>Id</Table.HeaderCell>
                          <Table.HeaderCell>Code</Table.HeaderCell>
                          <Table.HeaderCell>Client Name</Table.HeaderCell>
                          <Table.HeaderCell>Contact Number</Table.HeaderCell>
                          <Table.HeaderCell>Country</Table.HeaderCell>
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



export default ClientIndex