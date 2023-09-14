import { Person } from '@mui/icons-material';
import * as S from './style';
import { useAuth } from '../../contexts/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select'
import Logo from '../../static/Logo/sgpo1.png'

function HeaderInit() {
  const [user, setUser] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, []);

  const { Logout } = useAuth();

  async function handleLogout() {
    await Logout();
  }

  const options = [
    { value: 'logout', label: 'Logout' },
  ];

  return (
    <>
      <S.ContainerMain>
        <S.Title>
        <img src={Logo} alt="Logo" />
          Sistema de Gestao de processos operacionais (SGPO)
        </S.Title>
        <S.Profile>
          <S.VerticalHr></S.VerticalHr>
          <S.ContainerLogout>
          <Person  onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
            {isDropdownOpen && (
              <>{options.map(item => <S.Logout onClick={() => handleLogout()}>Logout</S.Logout>)}</>
            )}
          </S.ContainerLogout>

          <S.ProfileInfo>
            <S.UserInfo>
              Usuário: {user?.Person?.name}
            </S.UserInfo>
            <S.RoleInfo>
              Cargo: {user?.Role?.name}
            </S.RoleInfo>
          </S.ProfileInfo>
        </S.Profile>
      </S.ContainerMain>
    </>
  )

}

export default HeaderInit;
