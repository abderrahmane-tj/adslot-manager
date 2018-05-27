import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DataTable from '../Shared/DataTable';
import {AD_TYPE, ALL} from '../../config/constants';
import {Icon} from 'semantic-ui-react';

const columns = [
  {name: 'name', title: 'Name'},
  {
    name: 'type', title: 'Type',
    render(value) {
      let dict = {
        [AD_TYPE.WEB]: 'world',
        [AD_TYPE.APP]: 'mobile',
        [AD_TYPE.AUDIO]: 'music',
        [AD_TYPE.VIDEO]: 'record',
      };
      return <Icon name={dict[value]} />;
    },
    props: {
      textAlign: 'center',
    },
    headerProps: {
      textAlign: 'center',
    },
  },
  {name: 'url', title: 'URL'},
  {name: 'format', title: 'Format'},
  {name: 'price', title: 'Price'},
  {
    name: 'fallback', title: 'Fallback',
    render: v => v ? <Icon name="checkmark" color="green" /> : null,
    props: {
      textAlign: 'center',
    },
    headerProps: {
      textAlign: 'center',
    },
  },
];

function applyFilters({data, search, type, format}) {
  return data.filter(ad => {
    return (
      (ad.id === search || ad.name.includes(search))
      && (type === ALL || ad.type === type)
      && (format === ALL || ad.format === format)
    )
  });
}

export default class Table extends Component {
  state = {
    data: [],
    displayData: [],
  };

  static getDerivedStateFromProps(props, prevState) {
    const {data, search, type, format} = props;
    let newState = {
      ...(data !== prevState.data && data),
      ...(search !== prevState.search && {search}),
      ...(type !== prevState.type && {type}),
      ...(format !== prevState.format && {format}),
    };

    if(Object.keys(newState).length) {
      newState['displayData'] = applyFilters(props);
      return newState;
    } else {
      return null;
    }
  }

  render() {
    const { displayData } = this.state;
    return (
      <DataTable
        columnDefs={columns}
        data={displayData}
        onRowDoubleClick={this.props.onRowDoubleClick}
      />
    )
  }
}

Table.propTypes = {
  data: PropTypes.array,
  search: PropTypes.string,
  type: PropTypes.any,
  format: PropTypes.any,
  onRowDoubleClick: PropTypes.func,
};