import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import DataTable from 'react-data-table-component';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './style';

function UserList() {
  const [data, setData] = useState([]);
  const id = useParams();

  async function loadData() {
    get(`/users`)
      .then(async response => {
        if (response) {
          setData(response.records);
        }
      });
  }

  const columns = [
    {
      name: 'Nome de Acesso',
      selector: row =>  <S.Row href={`users/${row.id}`}>{row.access_name}</S.Row>,
    },
    {
      name: 'Nome',
      selector: row => <S.Row href={`users/${row.id}`}>{row.Person.name}</S.Row>,
    },
    {
      name: 'Cargo',
      selector: row => <S.Row href={`users/${row.id}`}>{row.Role.name}</S.Row>,
    },
    {
      name: 'Time',
      selector: row => <S.Row href={`users/${row.id}`}>{row.Team.name}</S.Row>,
    },
    {
      name: 'Editar',
      selector: row => row.year,
    },
  ];

  const customStyles = {
    table: {
      style: {
        border: '1px solid black',
      },
    },
    rows: {
      style: {
        minHeight: '72px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
  };

  useEffect(() => {
      loadData();
  }, [])
  return (
    <Container>
      <HeaderContent title="Usuários" icon={<Person fontSize="large"/>} titleButton="Novo Usuário" linkTo="/users/novo" />
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default UserList;
