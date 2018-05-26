import React, {Component} from 'react';
import {Form, Grid, Icon} from 'semantic-ui-react';
import DataTable from '../Shared/DataTable';
import {AD_TYPE} from '../../config/constants';

const {Input, Select} = Form;

export default class List extends Component {
  columns = [
    {name: 'name', title: 'Name'},
    {
      name: 'type', title: 'Type',
      render(value) {
        let dict = {
          [AD_TYPE.WEB]: 'browser',
          [AD_TYPE.APP]: 'mobile',
          [AD_TYPE.AUDIO]: 'music',
          [AD_TYPE.VIDEO]: 'record',
        };
        return <Icon name={dict[value]} />;
      }
    },
    {name: 'url', title: 'URL'},
    {name: 'format', title: 'Format'},
    {name: 'price', title: 'Price'},
    {name: 'fallback', title: 'Fallback'},
  ];

  typeOptions = [
    {text: 'Type 1', value: 1},
    {text: 'Type 2', value: 2},
  ];
  state = {
    data: [
      {
        'id': 2400,
        'name': 'Sample APP Adslot whatever',
        'type': 1,
        'url': 'us.origin/stopped',
        'format': '748x357',
        'price': 632,
        'fallback': true,
      },
      {
        'id': 2692,
        'name': 'Sample APP Adslot acres',
        'type': 2,
        'url': 'finish.gray/attack',
        'format': '958x787',
        'price': 959,
        'fallback': true,
      },
      {
        'id': 3232,
        'name': 'Sample APP Adslot select',
        'type': 3,
        'url': 'purple.applied/master',
        'format': '130x246',
        'price': 852,
        'fallback': true,
      },
      {
        'id': 3853,
        'name': 'Sample APP Adslot bend',
        'type': 4,
        'url': 'laugh.supply/here',
        'format': '319x299',
        'price': 953,
        'fallback': true,
      },
      {
        'id': 4247,
        'name': 'Sample APP Adslot fall',
        'type': 1,
        'url': 'proper.grandfather/met',
        'format': '442x304',
        'price': 799,
        'fallback': true,
      },
      {
        'id': 6288,
        'name': 'Sample APP Adslot scientist',
        'type': 1,
        'url': 'shadow.aid/taste',
        'format': '639x96',
        'price': 331,
        'fallback': true,
      },
      {
        'id': 6539,
        'name': 'Sample APP Adslot dark',
        'type': 4,
        'url': 'zoo.share/saved',
        'format': '34x945',
        'price': 516,
        'fallback': true,
      },
      {
        'id': 7368,
        'name': 'Sample APP Adslot fast',
        'type': 3,
        'url': 'away.when/greatly',
        'format': '973x597',
        'price': 46,
        'fallback': true,
      },
      {
        'id': 8037,
        'name': 'Sample APP Adslot clear',
        'type': 2,
        'url': 'blue.cry/steel',
        'format': '390x131',
        'price': 103,
        'fallback': true,
      },
      {
        'id': 9418,
        'name': 'Sample APP Adslot as',
        'type': 1,
        'url': 'matter.former/real',
        'format': '96x476',
        'price': 149,
        'fallback': false,
      },
    ],
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