import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Layout from '../components/layout';
import Users from '../pages/Users/List';
import User from '../pages/Users/Form';
import TeamList from '../pages/Team/List';
import Team from '../pages/Team/Form';
import Role from '../pages/Role/Form';
import RoleList from '../pages/Role/List';
import Supplier from '../pages/Supplier/Form';
import SupplierList from '../pages/Supplier/List';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/roles/:id" component={Role} />
          <Route path="/roles" component={RoleList} />
          <Route path="/teams/:id" component={Team} />
          <Route path="/teams" component={TeamList} />
          <Route path="/users/:id" component={User} />
          <Route path="/users" component={Users} />
          <Route path="/suppliers/:id" component={Supplier} />
          <Route path="/suppliers" component={SupplierList} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default PublicRoutes;