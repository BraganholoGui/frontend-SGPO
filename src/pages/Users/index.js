import HeaderContent from '../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../components/ListContent';
import DataTable from 'react-data-table-component';

function User() {
  const columns = [
    {
      name: 'Title',
      selector: row => row.title,
    },
    {
      name: 'Year',
      selector: row => row.year,
    },
  ];

  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
    },
  ]
  return (
    <Container>
      <HeaderContent title="Usuários" icon={<Person fontSize="large" />} />
      <ListContent
        columns={columns}
        data={data}
      ></ListContent>
    </Container>
  )

}

export default User;
