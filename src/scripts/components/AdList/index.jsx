import React, {Component} from 'react';
import {Button, Divider, Form, Grid, Icon} from 'semantic-ui-react';
import DataTable from '../Shared/DataTable';
import {AD_TYPE} from '../../config/constants';

const {Input, Select} = Form;

export default class AdList extends Component {
  columns = [
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

  typeOptions = [
    {text: 'Type 1', value: 1},
    {text: 'Type 2', value: 2},
  ];
  state = {
    data: [],
  };

  render() {
    const {data} = this.state;
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
            <Divider />
            <Button
              content="Create Ad"
              labelPosition='right'
              icon="plus"
              positive
            />
          </Form>
        </Grid.Column>
        <Grid.Column width={13}>
          <DataTable
            columnDefs={this.columns}
            data={data}
          />
        </Grid.Column>
      </Grid>
    );
  }
}