import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { ShoppingCart } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';

function PurchaseList() {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataMaterial, setDataMaterial] = useState([]);
  const { id } = useParams();
  const url = `/purchases`
  const location = useLocation();
  const [checked, setChecked] = useState(false);

  async function loadData() {
    let productList = [];
    let materialList = [];
    await get(url)
      .then(async response => {
        if (response) {
          response.records.map(item =>{
            if(item.SupplierPurchases){
              item.SupplierAux = item.SupplierPurchases.find(supPurchase => supPurchase.purchase == item.id)
            }
            if(item.material) {
              materialList.push(item)
            } else{
              productList.push(item)
            }
            if(item.end){
              let newDate = new Date(item.end)
              item.end = ((newDate.getDate() )) + "/" + ((newDate.getMonth() + 1)) + "/" + newDate.getFullYear(); 
            } 
          })
          setDataProduct(productList);
          setDataMaterial(materialList);
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
      selector: row => row.Product? row.Product.name : null,
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
      name: 'Fornecedor',
      selector: row =>  row.SupplierAux && row.SupplierAux.Supplier.Person && row.SupplierAux.Supplier.Person ? row.SupplierAux.Supplier.Person.name :  null,
      sortable: true,
    },
    {
      name: 'Prazo',
      selector: row => row.end,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row =>  row.status == 1 || !row.status ? "Pendente" :  row.status == 2 ? "Em Andamento" :  row.status == 3 ? "Concluído" : row.status == 4 ? "Negada" : "-",
      sortable: true,
    },
    {
      name: 'Editar/Deletar',
      selector: row => <EditDelete id={row.id} url={url} data={dataProduct} setData={setDataProduct} completed={row.status}/>,
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
      selector: row => row.Material ? row.Material.name : null,
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
      name: 'Fornecedor',
      selector: row =>  row.SupplierAux && row.SupplierAux.Supplier.Person && row.SupplierAux.Supplier.Person ? row.SupplierAux.Supplier.Person.name :  null,
      sortable: true,
    },
    {
      name: 'Prazo',
      selector: row =>  row.end,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row =>  row.status == 1 || !row.status ? "Pendente" :  row.status == 2 ? "Em Andamento" :  row.status == 3 ? "Concluído" : row.status == 4 ? "Negada" : "-",
      sortable: true,
    },
    {
      name: 'Editar/Deletar',
      selector: row => <EditDelete id={row.id} url={url} data={dataMaterial} setData={setDataMaterial} completed={row.status}/>,
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
      <HeaderContent title="Compras" icon={<ShoppingCart fontSize="large" />} titleButton="Nova Compra" linkTo="/purchases/novo" />
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

export default PurchaseList;
