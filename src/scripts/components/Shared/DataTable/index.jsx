import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'semantic-ui-react';
import TableRow from './TableRow';

export default class DataTable extends Component {
  handleRowDoubleClick(data) {
    console.log(data);
  }

  render() {
    const {columnDefs, data} = this.props;
    return (
      <Table compact selectable singleLine unstackable>
        <Table.Header>
          <Table.Row>
            {columnDefs.map(col => (
              <Table.HeaderCell
                key={col.name}
                {...col.props}
              >{col.title}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(row => (
            <TableRow
              key={row.id} data={row}
              onDoubleClick={this.handleRowDoubleClick}>
              {columnDefs.map(col => (
                <Table.Cell
                  key={col.name}
                  {...col.props}
                >{
                  col.render
                  ? col.render(row[col.name], row)
                  : row[col.name]
                }</Table.Cell>
              ))}
            </TableRow>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

DataTable.propTypes = {
  columnDefs: PropTypes.array,
  data: PropTypes.array
};
