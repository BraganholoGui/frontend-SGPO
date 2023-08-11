import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';

function SupplierList() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const url = `/suppliers`
  const location = useLocation();

  async function loadData() {
    await get(url)
      .then(async response => {
        if (response) {
          setData(response.records);
        }
      });

  }

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      center: true
    },
    {
      name: 'CNPJ',
      selector: row => row.cnpj,
      sortable: true,
    },
    {
      name: 'Nome',
      selector: row => row.Person ? row.Person.name : '-',
      sortable: true,
    },
    {
      name: 'Telefone',
      selector: row => row.Person && row.Person.Contact ? row.Person.Contact.phone : '-',
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.Person && row.Person.Contact ? row.Person.Contact.email : '-',
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
  }, [])

  return (
    <Container>
      <HeaderContent title="Fornecedores" icon={<Person fontSize="large" />} titleButton="Novo Fornecedor" linkTo="/suppliers/novo" />
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default SupplierList;
