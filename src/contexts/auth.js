import React, { createContext, useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import { toast } from '../GeneralFunctions/functions';
import * as actions from '../services/actions';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem('user');
    const storagedToken = localStorage.getItem('token');
    if (storagedToken && storagedUser) {
      setUser({ storagedUser });
      setToken(storagedToken)
      actions.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  async function Login(userData) {
    try {
      let x = actions.post('/login', userData).then(x => {
        setToken(x.token)
        setUser(x.user)
        console.log(x)
        localStorage.setItem('token', x.token)
        localStorage.setItem('user', JSON.stringify(x.user))
        actions.defaults.headers.Authorization = `Bearer ${token}`;
        toast('success', 'Bem vindo!');
      }).catch(err => {
        setToken(null)
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast('error', `Nome de acesso ou senha inválidos`);
      })

    } catch (e) {
      console.log("Error")
      toast('error', `Acesso negado!`);
    }
  }
  
  function Logout() {
    toast('success', 'DEslogado!');
    setToken(null);
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
      value={{ signed: Boolean(token), user, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}