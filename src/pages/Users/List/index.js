import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import DataTable from 'react-data-table-component';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserEdit() {
  const [data, setData] = useState([]);
  const id = useParams();

  async function loadData() {
    get(`/users`)
      .then(async response => {
        if (response) {
          console.log(response.records);
          setData(response.records);
        }
      });
  }

  const columns = [
    {
      name: 'Nome de Acesso',
      selector: row => row.access_name,
    },
    {
      name: 'Nome',
      selector: row => row.Person.name,
    },
    {
      name: 'Cargo',
      selector: row => row.Role.name,
    },
    {
      name: 'Time',
      selector: row => row.Team.name,
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

export default UserEdit;
