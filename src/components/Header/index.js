import { Person } from '@mui/icons-material';
import * as S from './style';
import { useAuth } from '../../contexts/auth';

function HeaderInit() {
  const { Logout } = useAuth();

  async function handleLogout() {
    await Logout();
  }

  return (
    <>
      <S.ContainerMain>
        <S.Title>
          Sistema de Gestao de processos operacionais (SGPO)
        </S.Title>
        <Person onClick={()=> handleLogout()} />
      </S.ContainerMain>
    </>
  )

}

export default HeaderInit;
