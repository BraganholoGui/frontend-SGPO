import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Home2 from '../pages/Home2';

const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Home} />
      <Route path="/hhh" component={Home2} />
    </BrowserRouter>
  );
};

export default PublicRoutes;