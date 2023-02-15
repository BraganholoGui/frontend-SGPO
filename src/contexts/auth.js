import React, { createContext, useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';

import * as actions from '../services/actions';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem('user');
    const storagedToken = localStorage.getItem('token');
    if (storagedToken && storagedUser) {
      setUser({ storagedUser });
      actions.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function Login(userData) {
    const response = await actions.post('https://localhost:3002/clients', userData);
    if (response.data.token) {
      const userLog = response.data.user.name;
      await api.get('/clients')
        .then(async (res) => {
          if (res && res.data) {
            await res.data.map(async (user) => {
              let log = false;
              if (user.name == userLog) {
                log = true
                await setUser(response.data.user);
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", userLog)
                localStorage.setItem("fullUser", JSON.stringify(user))
                localStorage.setItem("clientList", JSON.stringify(res.data))
              } 
              ShowToast(log);

            })
          }
        });
      actions.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    }
  }

  async function ShowToast(log) {
    if(log){
      await toast('success', 'Bem vindo!');
    }else{
      await toast('error', 'Erro ao realizar login!');
    }
  }

  function Logout() {
    setUser(null);
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }
  function toast(icon, msg) {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
    }).fire({
      icon: icon,
      title: msg
    });
  }
  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, Login, Logout, ShowToast }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}