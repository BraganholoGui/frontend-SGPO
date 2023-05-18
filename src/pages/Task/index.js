import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style'; 
import { Person } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';
import ListContentKanban from '../../components/ListContentKanban';

function TaskKanban() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const url = `/tasks`

  useEffect(() => {
  }, [])

  return (
    <Container>
      <HeaderContent title="Vendas" icon={<Person fontSize="large" />} titleButton="Nova Venda" linkTo="/sales/novo" />
      <ListContentKanban
      />

    </Container>
  )
}

export default TaskKanban;
