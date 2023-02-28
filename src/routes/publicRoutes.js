import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Layout from '../components/layout';
import About from '../pages/About';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route path="/about" component={About} />
          <Route path="/" component={Home} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
};

export default PublicRoutes;