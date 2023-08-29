import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Category } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';
import FilterContent from '../../../components/FilterContent';
import InputFormFilter from '../../../components/Form/InputFormFilter';
import { formattedDate } from '../../../GeneralFunctions/functions';

function ProductList() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const url = `/products`
  const location = useLocation();
  const [columnsExcel, setColumnsExcel] = useState([]);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [quantityMin, setQuantityMin] = useState(null);

  async function loadData(clean) {
    let start = new Date().toISOString() ;
    let end = new Date().toISOString();
    let startQuery = `start=${start}`;
    let endQuery = `end=${end}`;
    
    let query = start && end ? `?${startQuery}&${endQuery}` : start ? `?${startQuery}` : end ? `?${endQuery}` : '';
    if(!clean){
  
      let quantityMinQuery = quantityMin ? `quantityMin=${quantityMin}` : null;
      let nameQuery = name ? `name=${name}` : null;
      let priceQuery = price ? `price=${price}` : null;
      let descriptionQuery = description ? `description=${description}` : null;
  
      query = query.includes('?') ? query + '&' + quantityMinQuery : query + '?' + quantityMinQuery;
      query = query.includes('?') ? query + '&' + nameQuery : query + '?' + nameQuery;
      query = query.includes('?') ? query + '&' + priceQuery : query + '?' + priceQuery;
      query = query.includes('?') ? query + '&' + descriptionQuery : query + '?' + descriptionQuery;
    }

    get(`${url}${query}`)
      .then(async response => {
        if (response) {
          setData(response.records);
          let listAux = []
          response.records.map(item => {
            let obj = {
              id: item.id,
              Produto: item.name,
              Description: item.description,
              'Quantidade Mínima': item.quantity_min,
              'Quantidade': item.quantity,
              Criação: formattedDate(item.createdAt),
            }
            listAux.push(obj)
          })
          setColumnsExcel(listAux)
        }
      });

  }
  function cleanFilter(){
    setPrice('');
    setName('');
    setDescription('');
    setQuantityMin('');
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
      name: 'Nome',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Descrição',
      selector: row => row.description,
      sortable: true,
    },
    {
      name: 'Preço',
      selector: row => row.price,
      sortable: true,
    },
    {
      name: 'Quantidade mínima',
      selector: row => row.quantity_min,
      sortable: true,
    },
    {
      name: 'Quantidade',
      selector: row => row.quantity,
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
      <HeaderContent title="Produtos" icon={<Category fontSize="large" />} titleButton="Novo Produto" linkTo="/products/novo" />
      <FilterContent columnsExcel={columnsExcel} filesheet={"Produtos"} fileName={"products.xlsx"} loadData={() => loadData() } cleanFilter={() => cleanFilter() }>
        <InputFormFilter value={description} setValue={setDescription} title="Descrição" type='text' size="small"></InputFormFilter>
        <InputFormFilter value={name} setValue={setName} title="Nome" type='text' size="small"></InputFormFilter>
        <InputFormFilter value={price} setValue={setPrice} title="Preço" type='range' min="0" max="100" size="small"></InputFormFilter>
        <InputFormFilter value={quantityMin} setValue={setQuantityMin} title="Quantidade Mínima" type='text' size="small"></InputFormFilter>
      </FilterContent>
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default ProductList;
