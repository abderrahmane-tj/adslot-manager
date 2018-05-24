import React, {Component} from 'react';
import {Button, Dropdown, Grid, Icon, Input, Table} from 'semantic-ui-react';

export default class List extends Component {
  render() {
    return (
      <Grid container columns={2}>
        <Grid.Column width={3}>
          <div>
            <Input fluid icon="search" placeholder='Search ...' />
          </div>
          <div>
            <Dropdown text='Filter by type' icon='filter' floating labeled button className='icon'>
              <Dropdown.Menu>
                {[
                  {text: 'Type 1', value: 1},
                  {text: 'Type 2', value: 2},
                ].map(option => <Dropdown.Item key={option.value} {...option} />)}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Dropdown
              placeholder="Filter by format"
              options={[
                {text: 'Format 1', value: 1},
                {text: 'Format 2', value: 2},
              ]}
            />
          </div>
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