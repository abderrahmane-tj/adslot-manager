import React, {Component} from 'react';
import {
  Button,
  Dimmer,
  Divider,
  Form,
  Grid,
  Icon, Loader,
} from 'semantic-ui-react';
import DataTable from '../Shared/DataTable';
import {AD_TYPE} from '../../config/constants';
import {request} from '../../helpers/Http';

const {Input, Select} = Form;

const ALL = '--all--';

const typeOptions = [
  // the use of --all-- as the first option value is a temporary fix,
  // for a bug in Semantic-UI Dropdown
  {text: 'All types', value: ALL},
  {text: 'Web', value: AD_TYPE.WEB},
  {text: 'App', value: AD_TYPE.APP},
  {text: 'Audio', value: AD_TYPE.AUDIO},
  {text: 'Video', value: AD_TYPE.VIDEO},
];
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

  state = {
    adslots: [],
    type: ALL,
    format: ALL,
    formatOptions: [],
    loading: true,
    search: '',
  };

  handleTypeChange = (e, {value: type}) => this.setState({type});
  handleFormatChange = (e, {value: format}) => this.setState({format});
  handleSearchChange = (e, {value: search}) => this.setState({search});

  loadData() {
    return request('adslots');
  }

  buildFormatOptions(adslots) {
    let dict = {};
    return adslots.reduce((acc, ad) => {
      const format = ad.format;
      if (!dict[format]) {
        dict[format] = true;
        acc.push({text: format, value: format});
      }
      return acc;
    }, [
      {text: 'All formats', value: ALL},
    ]);
  }

  componentDidMount() {
    this.loadData().then(({adslots}) => {
      this.setState({
        loading: false,
        adslots,
        formatOptions: this.buildFormatOptions(adslots),
      });
    });
  }

  render() {
    const {
      adslots, type, format, formatOptions, loading, search,
    } = this.state;
    return (
      <Dimmer.Dimmable as={'div'} dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <Grid container columns={2}>
          <Grid.Column width={3}>
            <Form>
              <Input
                label="Search" placeholder="Search ..."
                fluid icon="search"
                value={search}
                onChange={this.handleSearchChange}
              />
              <Select
                fluid
                label="Filter by type"
                options={typeOptions}
                value={type}
                onChange={this.handleTypeChange}
              />
              <Select
                fluid search
                label="Filter by format"
                placeholder="Filter by format"
                options={formatOptions}
                value={format}
                onChange={this.handleFormatChange}
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
              data={adslots}
            />
          </Grid.Column>
        </Grid>
      </Dimmer.Dimmable>
    );
  }
}