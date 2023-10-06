import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth';
import PublicRoutes from './publicRoutes';
import PrivateRoutes from './privateRoutes';

const AppRoutes = () => {
  const { signed } = useAuth();
  const [user, setUser] = useState();

  useEffect(() => {
    if (!signed) {
      setUser(null);
    }
  }, []);
  return user || signed ? <PrivateRoutes /> : <PublicRoutes />;
};

export default AppRoutes;
