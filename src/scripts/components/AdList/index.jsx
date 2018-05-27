import React, {Component} from 'react';
import _debounce from 'lodash/debounce';
import {
  Button,
  Dimmer,
  Divider,
  Form,
  Grid,
  Loader,
} from 'semantic-ui-react';
import {AD_TYPE, ALL} from '../../config/constants';
import {request} from '../../helpers/Http';
import Table from './Table';

const {Input, Select} = Form;

const typeOptions = [
  // the use of ALL (--all--) as the first option value is a temporary fix,
  // for a bug in Semantic-UI Dropdown
  {text: 'All types', value: ALL},
  {text: 'Web', value: AD_TYPE.WEB},
  {text: 'App', value: AD_TYPE.APP},
  {text: 'Audio', value: AD_TYPE.AUDIO},
  {text: 'Video', value: AD_TYPE.VIDEO},
];

export default class AdList extends Component {
  state = {
    adslots: [],
    type: ALL,
    format: ALL,
    formatOptions: [],
    loading: true,
    search: '',
    searchValue: '',
  };

  handleTypeChange = (e, {value: type}) => this.setState({type});
  handleFormatChange = (e, {value: format}) => this.setState({format});
  handleSearchChange = (e, {value: searchValue}) => {
    this.setState({searchValue});
    this.updateSearchFilter(searchValue);
  };
  updateSearchFilter = _debounce(search => this.setState({search}), 250);

  handleRowDoubleClick = ({id}) => this.props.history.push(`/ad/${id}`);

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
      adslots, type, format, formatOptions, loading, search, searchValue
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
                value={searchValue}
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
            <Table
              data={adslots} type={type} format={format} search={search}
              onRowDoubleClick={this.handleRowDoubleClick}
            />
          </Grid.Column>
        </Grid>
      </Dimmer.Dimmable>
    );
  }
}