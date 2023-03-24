import HeaderContent from '../../components/HeaderContent';
import { Container } from './style';
import {Person} from '@mui/icons-material';

function User() {
  return (
      <Container>
        <HeaderContent title="Usuários" icon={<Person fontSize="large"/>}/>
        
      </Container>
  )

}

export default User;
