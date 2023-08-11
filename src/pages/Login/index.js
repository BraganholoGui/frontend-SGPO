import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './styles';
import { useAuth } from '../../contexts/auth';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { signed, Login } = useAuth();

  async function handleLogin() {
    await Login({
      name: userName,
      password: password
    });
  }

  return (
    <S.ContainerBody>
      <S.MainTitleLogin>
        SGPO - Login
      </S.MainTitleLogin>
        <S.Line/>
      <S.ContainerAll>
        <S.ContainerForm>
          <S.Form>
            <S.ContainerFields>
              <S.Label>
                Nome do usuário:
              </S.Label>
              <S.InputForm
                value={userName}
                type='text'
                onChange={(e) => {
                  setUserName(e.target.value)
                }} />
              <S.Label>
                Senha:
              </S.Label>
              <S.InputForm
                value={password}
                type='password'
                onChange={(e) => {
                  setPassword(e.target.value)
                }} />
            </S.ContainerFields>
            <S.ContainerButton>
              <S.ButtonForm onClick={handleLogin}>
                Login
              </S.ButtonForm>
            </S.ContainerButton>
          </S.Form>
        </S.ContainerForm>
      </S.ContainerAll>
    </S.ContainerBody>
  );
}

export default Login;
