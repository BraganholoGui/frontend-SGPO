import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Loyalty } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';
import FilterContent from '../../../components/FilterContent';
import InputFormFilter from '../../../components/Form/InputFormFilter';
import { formattedDate } from '../../../GeneralFunctions/functions';

function SaleList() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const url = `/sales`
  const location = useLocation();
  const [columnsExcel, setColumnsExcel] = useState([]);
  const [buyer, setBuyer] = useState(null);
  const [productSelected, setProductSelected] = useState(null);
  const [buyerSelected, setBuyerSelected] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null);

  const [productOptions, setProductsOptions] = useState('');
  const [buyerOptions, setBuyerOptions] = useState('');
  const [statusOptions, setStatusOptions] = useState('');

  async function loadData(clean) {
    let start = new Date().toISOString();
    let end = new Date().toISOString();
    let startQuery = `start=${start}`;
    let endQuery = `end=${end}`;


    let query = start && end ? `?${startQuery}&${endQuery}` : start ? `?${startQuery}` : end ? `?${endQuery}` : '';
    if (!clean) {
      
      let buyerQuery = buyerSelected && buyerSelected.id ? `status=${buyerSelected.id}` : null;
      let statusQuery = statusSelected && statusSelected.id ? `status=${statusSelected.id}` : null;
      let productQuery = productSelected && productSelected.id ? `product=${productSelected.id}` : null;

      query = query.includes('?') ? query + '&' + buyerQuery : query + '?' + buyerQuery;
      query = query.includes('?') ? query + '&' + statusQuery : query + '?' + statusQuery;
      query = query.includes('?') ? query + '&' + productQuery : query + '?' + productQuery;
    }

    await get(`${url}${query}`)
      .then(async response => {
        if (response) {
          setData(response.records);
          let listAux = []
          response.records.map(item => {
            let obj = {
              id: item.id,
              Comprador: item.Buyer && item.Buyer.Person ? item.Buyer.Person.name : '',
              'Telefone do Comprador': item.Buyer && item.Buyer.Person && item.Buyer.Person.Contact ? item.Buyer.Person.Contact.phone : '',
              'Email do Comprador': item.Buyer && item.Buyer.Person && item.Buyer.Person.Contact ? item.Buyer.Person.Contact.email : '',
              Produto: item.Product?.name,
              Status: item.Status?.name,
              'Quantidade da compra': item.quantity,
              Preço: "R$" + item.Product?.name + ",00",
              Criação: formattedDate(item.createdAt),
            }
            listAux.push(obj)
          })
          setColumnsExcel(listAux)
        }
      });

  }

  function cleanFilter() {
    setBuyerSelected('');
    setStatusSelected('');
    setProductSelected('');
    loadData(true);
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
      selector: row => row.status == 1 || !row.status ? "Pendente" : row.status == 2 ? "Em Andamento" : row.status == 3 ? "Concluído" : row.status == 4 ? "Negada" : "-",
      sortable: true,
    },
    {
      name: 'Editar/Deletar',
      selector: row => <EditDelete id={row.id} url={url} data={data} setData={setData} completed={row.status} />,
      center: true,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      },
    },
  ];

  const conditionalRowStyles = [
    // {
    //   when: row => row.status ==3,
    //   style: {
    //     color: 'green',
    //     fontWeight:'bold'
    //     // '&:hover': {
    //     //   cursor: 'pointer',
    //     // },
    //   },
    // },
  ];

  function getOptions() {
    get(`/products`)
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.name
          })
          setProductsOptions(response.records);
          if (data && data.product) {
            console.log(response.records.find(item => item.id == data.product))
            setProductSelected(response.records.find(item => item.id == data.product))
          }
        }
      });
    get(`/buyers`)
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.Person.name
          })
          setBuyerOptions(response.records);
          if (data && data.buyer) {
            setBuyerSelected(response.records.find(item => item.id == data.buyer))
          }
        }
      });

    get(`/status`)
      .then(async response => {
        if (response && response.records) {
          response.records = response.records.filter(item => !item.id_permission);
          response.records.map(item => {
            item.value = item.value;
            item.label = item.name
          })
          setStatusOptions(response.records);

        }
      });
  }

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
    getOptions();
    loadData();
  }, [])

  return (
    <Container>
      <HeaderContent title="Vendas" icon={<Loyalty fontSize="large" />} titleButton="Nova Venda" linkTo="/sales/novo" />
      <FilterContent columnsExcel={columnsExcel} filesheet={"Vendas"} fileName={"sales.xlsx"} loadData={() => loadData()} cleanFilter={() => cleanFilter()}>
        <InputFormFilter options={productOptions} selected={productSelected} setSelected={setProductSelected} value={productSelected} setValue={setProductSelected} title="Produto" type='select' size="medium"></InputFormFilter>
        <InputFormFilter options={buyerOptions} selected={buyerSelected} setSelected={setBuyerSelected} value={buyerSelected} setValue={setBuyerSelected} title="Comprador" type='select' size="medium"></InputFormFilter>
        <InputFormFilter options={statusOptions} selected={statusSelected} setSelected={setStatusSelected} value={statusSelected} setValue={setStatusSelected} title="Status" type='select' size="medium"></InputFormFilter>
      </FilterContent>
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
