import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" component={Login} />
    </Switch>
    </BrowserRouter>
  );
};

export default PrivateRoutes;