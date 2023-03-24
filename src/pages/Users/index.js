import HeaderContent from '../../components/HeaderContent';
import { Container } from './style';
import {Person} from '@mui/icons-material';
import ListContent from '../../components/ListContent';

function User() {
  return (
      <Container>
        <HeaderContent title="Usuários" icon={<Person fontSize="large"/>}/>
        <ListContent></ListContent>
      </Container>
  )

}

export default User;
