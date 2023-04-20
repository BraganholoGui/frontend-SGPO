import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Layout from '../components/layout';
import Users from '../pages/Users/List';
import User from '../pages/Users/Form';
import TeamList from '../pages/Team/List';
import Team from '../pages/Team/Form';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/users/:id" component={User} />
          <Route path="/users" component={Users} />
          <Route path="/teams/:id" component={Team} />
          <Route path="/teams" component={TeamList} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default PublicRoutes;