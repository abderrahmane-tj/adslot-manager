import React, {Component} from 'react';
import {Button, Dimmer, Divider, Form, Loader} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import _pick from 'lodash/pick';
import {API_URL, NONE, TYPE_OPTIONS} from '../../config/constants';

const {Input, Select, Checkbox} = Form;
const typeOptions = [
  {text: 'Choose ...', value: NONE},
  ...TYPE_OPTIONS,
];

const formFields = ['name', 'type', 'url', 'format', 'price', 'fallback'];

export default class AdForm extends Component {
  state = {
    loading: false,
    editing: false,
    name: '',
    type: NONE,
    url: '',
    format: '',
    price: 0,
    fallback: false,
  };

  handleTypeChange = (e, {value: type}) => this.setState({type});
  handleNameChange = (e, {value: name}) => this.setState({name});
  handleUrlChange = (e, {value: url}) => this.setState({url});
  handleFormatChange = (e, {value: format}) => this.setState({format});
  handlePriceChange = (e, {value: price}) => this.setState({price});
  handleFallbackChange = (e, {checked: fallback}) => this.setState({fallback});

  handleSubmit = e => {
    e.preventDefault();

    const {editing, id} = this.state;
    let method = editing ? 'PATCH' : 'POST';
    let path = editing ? `adslots/${id}` : 'adslots';
    let body = JSON.stringify(_pick(this.state, formFields));

    fetch(`${API_URL}/${path}`, {
      method,
      body,
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    }).then(r => r.json()).then(r => {
      if (method === 'POST' && !r.error) {
        const {data: {adslot: {id}}} = r;
        this.props.history.push(`/adslots/${id}`);
      }
      return r;
    }).catch(e => console.log(e));
  };

  static getDerivedStateFromProps(props, prevState) {
    const {match: {params, params: {id}}} = props;
    if (id !== prevState.id) {
      if (params.hasOwnProperty('id') && id !== 'new') {
        return {id, editing: true};
      } else {
        return {id, editing: false};
      }
    }
    return null;
  }

  componentDidMount() {
    const {editing, id} = this.state;
    if (editing) {
      this.setState({loading: true});
      fetch(`${API_URL}/adslots/${id}`)
      .then(r => r.json())
      .then(result => {
        if(result.data) {
          this.setState({
            ..._pick(result.data.adslot, formFields),
            loading: false
          });
        }
      })
      .catch(e => console.log(e));
    }
  }

  render() {
    const {
      name, type, url, format, price, fallback, editing, loading,
    } = this.state;

    return (
      <Dimmer.Dimmable as={'div'} dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <Form onSubmit={this.handleSubmit}>
          <Input
            label="Name" value={name}
            onChange={this.handleNameChange}
          />
          <Select
            label="Type"
            options={typeOptions}
            value={type}
            onChange={this.handleTypeChange}
          />
          <Input
            label="Url" value={url}
            onChange={this.handleUrlChange}
          />
          <Input
            label="Format" value={format}
            onChange={this.handleFormatChange}
          />
          <Input
            label="Price" value={price} onChange={this.handlePriceChange}
          />
          <Checkbox
            label="Fallback"
            checked={fallback}
            onChange={this.handleFallbackChange}
            toggle
          />
          <Divider hidden />
          <div>
            <Button
              content="Back to List"
              labelPosition='left'
              floated="left"
              icon="chevron left"
              as={Link}
              to="/list"
            />
            <Button
              content={editing ? 'Update' : 'Save'}
              labelPosition="right"
              floated="right"
              icon="check"
              positive
              type="submit"
              onClick={this.handleSubmit}
            />
          </div>
        </Form>
      </Dimmer.Dimmable>
    );
  }
}