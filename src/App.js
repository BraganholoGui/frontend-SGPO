import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from './contexts/auth';
import useBackgroundOsndImportService from './services/osnd-import-service';

function App() {
  const [ready, setReady] = useState(false);
  // useBackgroundOsndImportService()

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
