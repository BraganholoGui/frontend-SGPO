import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';

function TeamList() {
  const [data, setData] = useState([]);
  const {id} = useParams();
  const url = `/teams`
  const urlAux = `/teams-user`

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
      selector: row =>  <S.Row href={`teams/${row.id}`}>{row.id}</S.Row>,
      sortable: true,
      center:true
    },
    {
      name: 'Time',
      selector: row =>  <S.Row href={`teams/${row.id}`}>{row.name}</S.Row>,
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
  })

  return (
    <Container>
      <HeaderContent title="Times" icon={<Person fontSize="large"/>} titleButton="Novo Time" linkTo="/teams/novo" />
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default TeamList;
