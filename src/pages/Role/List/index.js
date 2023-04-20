import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation, useRouteMatch } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';

function RoleList() {
  const [data, setData] = useState([]);
  const {id} = useParams();
  const url = `/roles`
  const location = useLocation();

  async function loadData() {
    get(url)
      .then(async response => {
        if (response) {
          setData(response.records);
        }
      });
  }

  const columns = [
    {
      name: 'ID',
      selector: row =>  <S.Row href={`roles/${row.id}`}>{row.id}</S.Row>,
      sortable: true,
      center:true
    },
    {
      name: 'Cargo',
      selector: row =>  <S.Row href={`roles/${row.id}`}>{row.name}</S.Row>,
      sortable: true,
    },
    {
      name: 'Editar/Deletar',
      selector: row => <EditDelete id={row.id} url={url} data={data} setData={setData}/>,
      center:true,
      style: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
      },
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
  }, [location.key])

  return (
    <Container>
      <HeaderContent title="Cargos" icon={<Person fontSize="large"/>} titleButton="Novo Cargo" linkTo="/roles/novo" />
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default RoleList;
