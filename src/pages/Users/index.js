import HeaderContent from '../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../components/ListContent';
import DataTable from 'react-data-table-component';

function User() {
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

  const data = [
    {
      id: 1,
      access_name: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      access_name: 'Ghostbusters',
      year: '1984',
    },
    {
      id: 3,
      access_name: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 4,
      access_name: 'Ghostbusters',
      year: '1984',
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
  return (
    <Container>
      <HeaderContent title="Usuários" icon={<Person fontSize="large" />} />
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default User;
