import React, {Component} from 'react';
import {
  Form, Grid, Icon, Table,
} from 'semantic-ui-react';
const {Input, Select} = Form;

export default class List extends Component {
  typeOptions = [
    {text: 'Type 1', value: 1},
    {text: 'Type 2', value: 2},
  ];
  render() {

    return (
      <Grid container columns={2}>
        <Grid.Column width={3}>
          <Form>
            <Input
              label="Search" placeholder="Search ..."
              fluid icon="search"
            />
            <Select
              placeholder="Filter by type"
              fluid label="Filter by type"
              options={this.typeOptions}
            />
            <Select
              fluid label="Filter by format" options={this.typeOptions}
            />
          </Form>
        </Grid.Column>
        <Grid.Column width={13}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>No Name Specified</Table.Cell>
                <Table.Cell>Unknown</Table.Cell>
                <Table.Cell>None</Table.Cell>
              </Table.Row>
              <Table.Row warning>
                <Table.Cell>Jimmy</Table.Cell>
                <Table.Cell>
                  <Icon name='attention' /> Requires Action
                </Table.Cell>
                <Table.Cell>None</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jamie</Table.Cell>
                <Table.Cell>Unknown</Table.Cell>
                <Table.Cell warning>
                  <Icon name='attention' /> Hostile
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jill</Table.Cell>
                <Table.Cell>Unknown</Table.Cell>
                <Table.Cell>None</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    );
  }
}