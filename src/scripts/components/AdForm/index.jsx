import React, {Component} from 'react';
import {Button, Divider, Form} from 'semantic-ui-react';
import {NONE, TYPE_OPTIONS} from '../../config/constants';
import {Link} from 'react-router-dom';

const {Input, Select, Checkbox} = Form;
const typeOptions = [
  {text: 'Choose ...', value: NONE},
  ...TYPE_OPTIONS,
];

export default class AdForm extends Component {
  state = {
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

  }

  render() {
    const {
      name, type, url, format, price, fallback, editing,
    } = this.state;

    return (
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
    );
  }
}