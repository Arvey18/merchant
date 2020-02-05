import * as React from 'react';
import {Route, Switch} from 'react-router-dom';

// settings
import PrivateRoute from '../private-route';

// pages
import Home from '../../pages/home';
import Dashboard from '../../pages/dashboard';
import NoMatch from '../../pages/nomatch';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/dashboard-add" component={Dashboard} />
      <PrivateRoute path="/dashboard-edit/:name/:id" component={Dashboard} />
      <PrivateRoute path="/dashboard-settings" component={Dashboard} />
      <Route component={NoMatch} />
    </Switch>
  );
}
