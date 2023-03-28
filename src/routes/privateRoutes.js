import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Layout from '../components/layout';
import User from '../pages/User/List';
import UserEdit from '../pages/User/Edit';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/user/:id" component={UserEdit} />
          <Route path="/users" component={User} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default PublicRoutes;