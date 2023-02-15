import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth';
import PublicRoutes from './puclibRoutes';
import PrivateRoutes from './privateRoutes';

const AppRoutes = () => {
  const { signed } = useAuth();
  return <PublicRoutes />
  return signed ? <PublicRoutes /> : <PrivateRoutes />;
};

export default AppRoutes;
