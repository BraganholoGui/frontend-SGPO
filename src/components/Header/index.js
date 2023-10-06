import { Person, InsertChart } from '@mui/icons-material';
import * as S from './style';
import { useAuth } from '../../contexts/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import Logo from '../../static/Logo/sgpo1.png';
import './style.css';

function HeaderInit() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [fullLogo, setFullLogo] = useState(false);
  const [minorLogo, setMinorLogo] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
    console.log(JSON.parse(localStorage.getItem('user')))
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

          {fullLogo ?
            <>
              <S.DivLogoSquare onClick={() => { setMinorLogo(true); setFullLogo(false) }}>
                <InsertChart fontSize='large' />
              </S.DivLogoSquare>
              <S.DivLogo>
                <S.FullNameLogo>
                  Sistema de Gestão de Processos Operacionais
                </S.FullNameLogo>
              </S.DivLogo>
            </>
            : null}
          {minorLogo ?
            <S.Cube onClick={() => { setFullLogo(true); setMinorLogo(false) }}>
              <div>
                <span style={{ "--i": 0 }}>SGPO</span>
              </div>
            </S.Cube>
            : null
          }
        </S.Title>
        <S.Profile>
          <S.VerticalHr></S.VerticalHr>
          <S.ContainerLogout>
            {user?.photo ? <img src={`data:image/jpeg;base64,${user.photo}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)} alt={user.access_name} style={{ width: '50px', height: 'auto',marginRight:'10px', borderRadius:'50%' }} /> :
              <Person onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ width: '50px', height: 'auto',marginRight:'10px', borderRadius:'50%' }} />
            }
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
