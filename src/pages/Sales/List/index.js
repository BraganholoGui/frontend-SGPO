import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';

function SaleList() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const url = `/sales`
  const location = useLocation();

  async function loadData() {
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
      selector: row => row.id,
      sortable: true,
      center: true,
    },
    {
      name: 'Comprador',
      selector: row => row.Buyer && row.Buyer.Person ? row.Buyer.Person.name : '',
      sortable: true,
    },
    {
      name: 'Produto',
      selector: row => row.Product.name,
      sortable: true,
    },
    {
      name: 'Preço Total',
      selector: row => row.price,
      sortable: true,
    },
    {
      name: 'Quantidade',
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status == 1 || !row.status ? "Pendente" :  row.status == 2 ? "Em Andamento" :  row.status == 3 ? "Concluído" : row.status == 4 ? "Negada" : "-",
      sortable: true,
    },
    {
      name: 'Editar/Deletar',
      selector: row => <EditDelete id={row.id} url={url} data={data} setData={setData} completed={row.status}/>,
      center: true,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      },
    },
  ];

  const conditionalRowStyles = [
    {
      when: row => row.status ==3,
      style: {
        color: 'green',
        fontWeight:'bold'
        // '&:hover': {
        //   cursor: 'pointer',
        // },
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
      <HeaderContent title="Vendas" icon={<Person fontSize="large" />} titleButton="Nova Venda" linkTo="/sales/novo" />
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
      />

    </Container>
  )

}

export default SaleList;
