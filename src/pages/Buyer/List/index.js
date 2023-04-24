import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';

function BuyerList() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  const url = `/buyers`
  const location = useLocation();

  async function loadData() {
    setLoad(!load)
    await get(url)
      .then(async response => {
        if (response) {
          console.log(response.records);
          setData(response.records);
        }
      });

  }

  const columns = [
    {
      name: 'ID',
      selector: row => <S.Row href={`buyers/${row.id}`}>{row.id}</S.Row>,
      sortable: true,
      center: true
    },
    {
      name: 'CNPJ',
      selector: row => <S.Row href={`buyers/${row.id}`}>{row.cpf_cnpj}</S.Row>,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => <S.Row href={`buyers/${row.id}`}>{row.Person ? row.Person.name : '-'}</S.Row>,
      sortable: true,
    },
    {
      name: 'Telefone',
      selector: row => <S.Row href={`buyers/${row.id}`}>{row.Person && row.Person.Contact ? row.Person.Contact.phone : '-'}</S.Row>,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => <S.Row href={`buyers/${row.id}`}>{row.Person && row.Person.Contact ? row.Person.Contact.email : '-'}</S.Row>,
      sortable: true,
    },
    {
      name: 'Editar/Deletar',
      selector: row => <EditDelete id={row.id} url={url} data={data} setData={setData} />,
      center: true,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

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
  }, [load])

  return (
    <Container>
      <HeaderContent title="Compradores" icon={<Person fontSize="large" />} titleButton="Novo Compradores" linkTo="/buyers/novo" />
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default BuyerList;
