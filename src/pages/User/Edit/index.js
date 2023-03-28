import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
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
          setData(response.records);
        }
      });
  }

  const columns = [
    {
      name: 'Acesso',
      selector: row => row.access_name,
    },
    {
      name: 'Nome',
      selector: row => row.year,
    },
    {
      name: 'Cargo',
      selector: row => row.year,
    },
    {
      name: 'Time',
      selector: row => row.year,
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
      <HeaderContent id={id} title={id == "novo" ? "Novo Usuário" : "Editar Usuário"} icon={<Person fontSize="large"/>} />
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default UserEdit;
