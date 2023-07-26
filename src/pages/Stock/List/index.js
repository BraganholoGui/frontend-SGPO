import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';

function StockList() {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataMaterial, setDataMaterial] = useState([]);
  const { id } = useParams();
  const urlProducts = `/products`
  const urlMaterials = `/materials`
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  async function loadData() {
    await get(urlProducts)
      .then(async response => {
        if (response) {
          console.log( response.records);
          setDataProduct( response.records);
          console.log( response.records);
        }
      });
      
      await get(urlMaterials)
      .then(async response => {
        if (response) {
          console.log( response.records);
          setDataMaterial( response.records);
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
      name: 'Produto',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Preço',
      selector: row => row.price,
      sortable: true,
    },
    {
      name: 'Quantidade',
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: 'Quantidade Mínima',
      selector: row => row.quantity_min,
      sortable: true,
    },
    {
      name: 'Descrição',
      selector: row =>  row.description,
      sortable: true,
    },
    {
      name: 'Editar/Deletar',
      selector: row => <EditDelete id={row.id} url={urlProducts} data={dataProduct} setData={setDataProduct} />,
      center: true,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      },
    },
  ];
  const columnsMaterial = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      center: true,
    },
    {
      name: 'Material',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Preço',
      selector: row => row.price,
      sortable: true,
    },
    {
      name: 'Quantidade',
      selector: row => row.quantity,
      sortable: true,
    },
    {
      name: 'Quantidade Mínima',
      selector: row => row.quantity_min,
      sortable: true,
    },
    {
      name: 'Descrição',
      selector: row =>  row.description,
      sortable: true,
    },
    {
      name: 'Editar/Deletar',
      selector: row => <EditDelete id={row.id} url={urlMaterials} data={dataMaterial} setData={setDataMaterial} />,
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
      when: row => row.quantity < row.quantity_min,
      style: {
        color: 'red',
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
      <HeaderContent title="Estoque" icon={<Person fontSize="large" />} />
      <ListContent
        columns={!checked ? columns : columnsMaterial}
        data={!checked ? dataProduct : dataMaterial}
        customStyles={customStyles}
        swicth={true}
        checked={checked}
        setChecked={setChecked}
        conditionalRowStyles={conditionalRowStyles}
      />

    </Container>
  )

}

export default StockList;
