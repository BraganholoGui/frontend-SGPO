import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth';
import PublicRoutes from './publicRoutes';
import PrivateRoutes from './privateRoutes';

const AppRoutes = () => {
  const { signed } = useAuth();
  // return <PrivateRoutes />
  return signed ? <PrivateRoutes /> : <PublicRoutes />;
};
 
export default AppRoutes;
