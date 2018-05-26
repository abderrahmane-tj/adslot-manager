import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';

export default class DataTable extends Component {
  render() {
    const {columnDefs, data} = this.props;
    return (
      <Table compact>
        <Table.Header>
          <Table.Row>
            {columnDefs.map(col => (
              <Table.HeaderCell key={col.name}>{col.title}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(row => (
            <Table.Row key={row.id}>
              {columnDefs.map(col => (
                <Table.Cell key={col.name}>{row[col.name]}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}
