import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from './contexts/auth';

function App() {
  console.log('teste')
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true)
  }, []);

  return ready ?
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    : null;
}

export default App;
