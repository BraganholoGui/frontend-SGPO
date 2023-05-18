import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';
import ListContentKanban from '../../../components/ListContentKanban';

function TaskKanban() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  const url = `/themes`
  const location = useLocation();

  async function loadData() {
    setLoad(!load)
    await get(url)
      .then(async response => {
        if (response) {
          setData(response.records);
        }
      });

  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Container>
      <HeaderContent title="Tarefas" icon={<Person fontSize="large" />} titleButton="Nova Tarefa" linkTo="/tasks/novo" />
      <ListContentKanban/>

    </Container>
  )

}

export default TaskKanban; 
