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
import Buyer from '../pages/Buyer/Form';
import BuyerList from '../pages/Buyer/List';
import MaterialList from '../pages/Material/List';
import Material from '../pages/Material/Form';
import Product from '../pages/Product/Form';
import ProductList from '../pages/Product/List';
import Theme from '../pages/Theme/Form';
import ThemeList from '../pages/Theme/List';
import SaleList from '../pages/Sales/List';
import Sale from '../pages/Sales/Form';
import Purchase from '../pages/Purchase/Form';
import PurchaseList from '../pages/Purchase/List';
import TaskKanban from '../pages/Task';

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
          <Route path="/buyers/:id" component={Buyer} />
          <Route path="/buyers" component={BuyerList} />
          <Route path="/materials/:id" component={Material} />
          <Route path="/materials" component={MaterialList} />
          <Route path="/products/:id" component={Product} />
          <Route path="/products" component={ProductList} />
          <Route path="/purchases/:id" component={Purchase} />
          <Route path="/purchases" component={PurchaseList} />
          <Route path="/sales/:id" component={Sale} />
          <Route path="/sales" component={SaleList} />
          {/* <Route path="/themes/:id" component={TaskKanban} /> */}
          <Route path="/tasks" component={TaskKanban} />
          <Route path="/themes/:id" component={Theme} />
          <Route path="/themes" component={ThemeList} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default PublicRoutes;