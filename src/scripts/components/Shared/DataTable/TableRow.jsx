import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'semantic-ui-react';

const {Row} = Table;

export default class TableRow extends Component {
  handleDoubleClick = () => {
    const {onDoubleClick, data} = this.props;
    if (onDoubleClick) {
      onDoubleClick(data);
    }
  };

  render() {
    const {children, ...rowProps} = this.props;
    return (
      <Row
        {...rowProps}
        onDoubleClick={this.handleDoubleClick}
      >{children}</Row>
    );
  }
}

TableRow.propTypes = {
  onDoubleClick: PropTypes.func,
  data: PropTypes.array
};