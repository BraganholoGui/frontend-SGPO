import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './styles';
import { useAuth } from '../../contexts/auth';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { signed, Login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin() {
    await Login({
      name: userName,
      password: password
    });
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const { Logout } = useAuth();
  async function handleLogout() {
    await Logout();
  }

  // useEffect(() => {
  //   Logout();
  // }, []);

  return (
    <S.ContainerBody>
      <S.MainTitleLogin>
        <S.Cube >
          <div>
            <span style={{ "--i": 0 }}>SGPO</span>
          </div>
        </S.Cube>
      </S.MainTitleLogin>
        <S.Title>Sistema de Gestão de Processos Operacionais</S.Title>
      <S.Line />
      <S.ContainerAll>
        <S.ContainerForm>
          <S.Form>
            <S.ContainerFields>
              <S.Label>
                Nome de acesso:
              </S.Label>
              <S.InputForm
                value={userName}
                type='text'
                onChange={(e) => {
                  setUserName(e.target.value)
                }}
                onKeyPress={handleKeyPress}
              />
              <S.Label>
                Senha:
              </S.Label>
              <S.StyledPasswordInput>
                <S.PasswordInput
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  onKeyPress={handleKeyPress}
                />
                <S.PasswordToggle onClick={togglePasswordVisibility}>
                  <S.PasswordIcon>
                    {showPassword ? <S.PasswordEyeSlashIcon /> : <S.PasswordEyeIcon />}
                  </S.PasswordIcon>
                </S.PasswordToggle>
              </S.StyledPasswordInput>
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
