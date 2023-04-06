/* eslint-disable no-async-promise-executor */
import { ReactElement } from 'react';
import history from '../history';
import api from './api';

function clear() {
  localStorage.removeItem('token');
  history.push('/login');
}

function handleResponse(resp) {
  if(resp){
    if (resp.status === 403) {
      clear();
    } else {
      return resp.data;
    }
  }

}

export async function get(url) {

  return await api.get(url, {
    headers: {
      authorization: 'Bearer '+ await localStorage.getItem('token')
    }
  })
    .then((response) => {
      console.log('')
      return handleResponse(response);
    })
    .catch((error) => {
      console.log(error);
      clear();
    });
}

export function post(text, user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            token:
              '91j893h281h9nf98fnf2309jd09jkkd0as98238j9fr8j98f9j8f298r829r-f',
            user: {
              name: user.name,
            },
          },
        });
      }, 2000);
    });
  }
  
  export const defaults = {
    headers: {
      Authorization: '',
    },
  };
