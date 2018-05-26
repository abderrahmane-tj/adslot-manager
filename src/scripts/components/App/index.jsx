import React, {Component} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {Grid, Header} from 'semantic-ui-react';
import AdForm from '../AdForm';
import List from '../AdList';

export default class App extends Component {
  render() {
    return (
      <Grid container columns={1}>
        <Grid.Column>
          <Header as='h1'>Adslots Manager</Header>
          <BrowserRouter>
            <Switch>
              <Route path="/ad/" component={AdForm}/>
              <Route path="/" component={List}/>
            </Switch>
          </BrowserRouter>
        </Grid.Column>
      </Grid>
    );
  }
}