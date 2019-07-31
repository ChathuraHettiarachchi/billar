import React from 'react';
import {Link} from 'react-router-dom';
import {
    Button,
    Grid,
    Header, Menu,
    Segment,
    Table
} from "semantic-ui-react";

function ReleasesIndex() {
    return(
      <div>
          <Segment>
              <Grid style={{minHeight:'0'}}>
                  <Grid.Row>
                      <Grid.Column width={4} floated='left' verticalAlign='middle'>
                          <Header>Releases</Header>
                      </Grid.Column>
                  </Grid.Row>
              </Grid>
          </Segment>
          <Segment>
              <Table compact celled>
                  <Table.Header fullWidth>
                      <Table.Row>
                          <Table.HeaderCell>Id</Table.HeaderCell>
                          <Table.HeaderCell>Client</Table.HeaderCell>
                          <Table.HeaderCell>Title</Table.HeaderCell>
                          <Table.HeaderCell>Amount</Table.HeaderCell>
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



export default ReleasesIndex