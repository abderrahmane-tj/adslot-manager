import React, {Component} from 'react';
import {Route, Switch, BrowserRouter, Link} from 'react-router-dom';
import {Divider, Grid, Header} from 'semantic-ui-react';
import AdForm from '../AdForm';
import AdList from '../AdList';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Grid container columns={1} style={{marginTop: '20px'}}>
          <Grid.Column>
            <Link to="/"><Header as='h1'>Adslots Manager</Header></Link>
            <Divider hidden />
            <Switch>
              <Route path="/adslots/:id" component={AdForm} />
              <Route path="/" component={AdList} />
            </Switch>
          </Grid.Column>
        </Grid>
      </BrowserRouter>
    );
  }
}