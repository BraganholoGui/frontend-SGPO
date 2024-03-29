import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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
import TaskKanban from '../pages/Task/List';
import Task from '../pages/Task/Form';
import StockList from '../pages/Stock/List';

const PublicRoutes = () => {

  const [user, setUser] = useState(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
    setPermission(JSON.parse(localStorage.getItem('user'))?.Role.status)
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        {
          permission == 4 ?
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
              <Route path="/stock" component={StockList} />
              <Route path="/tasks/:id" component={Task} />
              <Route path="/tasks" component={TaskKanban} />
              <Route path="/themes/:id" component={Theme} />
              <Route path="/themes" component={ThemeList} />
              <Route path="/" component={Dashboard} />
              <Redirect to={'/'} />
            </Switch>
            : permission == 5 ? 
            <Switch>
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
          <Route path="/stock" component={StockList} />
          <Route path="/tasks/:id" component={Task} />
          <Route path="/tasks" component={TaskKanban} />
          <Route path="/" component={Dashboard} />
          <Redirect to={'/'} />
        </Switch>
          :
          <Switch>
          <Route path="/materials" component={MaterialList} />
          <Route path="/products" component={ProductList} />
          <Route path="/stock" component={StockList} />
          <Route path="/tasks/:id" component={Task} />
          <Route path="/tasks" component={TaskKanban} />
          <Route path="/" component={Dashboard} />
          <Redirect to={'/'} />
        </Switch>
          }

      </Layout>
    </BrowserRouter>
  );
};

export default PublicRoutes;