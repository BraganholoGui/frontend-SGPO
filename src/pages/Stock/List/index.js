import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Inventory } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';
import FilterContent from '../../../components/FilterContent';
import SwitchMaterialProduct from '../../../components/Switch/MaterialProduct';
import InputFormFilter from '../../../components/Form/InputFormFilter';
import { findMaxPrice, findMaxQtdMin, formattedDate } from '../../../GeneralFunctions/functions';

function StockList() {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataMaterial, setDataMaterial] = useState([]);
  const { id } = useParams();
  const urlProducts = `/products`
  const urlMaterials = `/materials`
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const [columnsExcelProd, setColumnsExcelProd] = useState([]);
  const [columnsExcelmat, setColumnsExcelMat] = useState([]);
  const [lowQuantity, setLowQuantity] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantityMin, setQuantityMin] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [maxQtdMin, setMaxQtdMin] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'))

  async function loadData(clean) {
    let maxAllPrice;
    let maxAllQtdMin;
    let maxProductPrice;
    let maxProductQtdMin;
    let maxMaterialPrice;
    let maxMaterialQtdMin;

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
    await get(`${urlProducts}${query}`)
      .then(async response => {
        if (response) {
          let list = [];
          let listAux = [];
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
            if (lowQuantity) {
              if (item.quantity_min > item.quantity) list.push(item)
            } else {
              list.push(item)
            }
          })
          maxProductPrice = findMaxPrice(list);
          maxProductQtdMin = findMaxQtdMin(list);
          setDataProduct(list);
          setColumnsExcelProd(listAux);
        }
      });

     await get(`${urlMaterials}${query}`)
      .then(async response => {
        if (response) {
          let list = [];
          let listAux = [];
          response.records.map(item => {
            let obj = {
              id: item.id,
              Material: item.name,
              Description: item.description,
              'Quantidade Mínima': item.quantity_min,
              'Quantidade': item.quantity,
              Criação: formattedDate(item.createdAt),
            }
            listAux.push(obj)
            if (lowQuantity) {
              if (item.quantity_min > item.quantity) list.push(item)
            } else {
              list.push(item)
            }
          })
          maxMaterialPrice = findMaxPrice(list);
          maxMaterialQtdMin = findMaxQtdMin(list);
          setDataMaterial(list);
          setColumnsExcelMat(listAux);
        }
      });

      maxAllPrice = maxProductPrice > maxMaterialPrice ? maxProductPrice : maxMaterialPrice;
      maxAllQtdMin= maxProductQtdMin > maxMaterialQtdMin ? maxProductQtdMin : maxMaterialQtdMin;
      if(!maxQtdMin) setMaxQtdMin(maxAllQtdMin)
      if(!maxPrice) setMaxPrice(maxAllPrice)
      
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
      name: 'Quantidade Mínima',
      selector: row => row.quantity_min,
      sortable: true,
    },
    {
      name: 'Quantidade',
      selector: row => row.quantity || 0,
      sortable: true,
    },
    {
      name: 'Ações',
      selector: row => <EditDelete comum={user.Role?.status == 6 ? true : false} id={row.id} url={urlProducts} data={dataProduct} setData={setDataProduct} alert={row.quantity_min > row.quantity ? true : false} />,
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
      name: 'Quantidade Mínima',
      selector: row => row.quantity_min,
      sortable: true,
    },
    {
      name: 'Quantidade',
      selector: row => row.quantity || 0,
      sortable: true,
    },
    {
      name: 'Ações',
      selector: row => <EditDelete id={row.id} url={urlMaterials} data={dataMaterial} setData={setDataMaterial} alert={row.quantity_min > row.quantity ? true : false} />,
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
    //   when: row => row.quantity < row.quantity_min,
    //   style: {
    //     color: 'red',
    //   },
    // },
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
  function cleanFilter(){
    setPrice('');
    setName('');
    setDescription('');
    setQuantityMin('');
    setLowQuantity(false)
    loadData(true);
  }

  return (
    <Container>
      <HeaderContent title="Estoque" icon={<Inventory fontSize="large" />} />
      <FilterContent spaceTitle columnsExcel={!checked ? columnsExcelProd : columnsExcelmat} filesheet={!checked ? "Produtos" : "Materiais"} fileName={!checked ? "products.xlsx" : "materials.xlsx"} loadData={() => loadData()} cleanFilter={() => cleanFilter()}>
        <InputFormFilter spaceTitle value={description} setValue={setDescription} title="Descrição" type='text' size="small"></InputFormFilter>
        <InputFormFilter spaceTitle value={name} setValue={setName} title="Nome" type='text' size="small"></InputFormFilter>
        <InputFormFilter spaceTitle value={price} setValue={setPrice} title="Preço" type='range' min="0" max={maxPrice} size="small"></InputFormFilter>
        <InputFormFilter spaceTitle value={quantityMin} setValue={setQuantityMin} title="Qtd Mín." type='range' min="0" max={maxQtdMin} size="small"></InputFormFilter>
      </FilterContent>
      <ListContent
        columns={!checked ? columns : columnsMaterial}
        data={!checked ? dataProduct : dataMaterial}
        customStyles={customStyles}
        range={true}
        swicth={true}
        checked={checked}
        setChecked={setChecked}
        conditionalRowStyles={conditionalRowStyles}
      >
        <InputFormFilter value={lowQuantity} setValue={setLowQuantity} title="Estoque Baixo" type='radio' size="small" loadData={() => loadData()}></InputFormFilter>
      </ListContent>

    </Container>
  )

}

export default StockList;
