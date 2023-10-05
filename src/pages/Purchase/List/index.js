import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { ShoppingCart } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';
import FilterContent from '../../../components/FilterContent';
import InputFormFilter from '../../../components/Form/InputFormFilter';
import { formattedDate } from '../../../GeneralFunctions/functions';
import Purchase from '../Form';

function PurchaseList() {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataMaterial, setDataMaterial] = useState([]);
  const { id } = useParams();
  const url = `/purchases`
  const [idAux, setIdAux] = useState(false);
  const [urlAux, setUrlAux] = useState(false);
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const [columnsExcel, setColumnsExcel] = useState([]);
  const [nameSelected, setNameSelected] = useState(null);
  const [supplierSelected, setSupplierSelected] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [columnsExcelProd, setColumnsExcelProd] = useState([]);
  const [columnsExcelMat, setColumnsExcelMat] = useState([]);

  const [materialsOptions, setMaterialsOptions] = useState('');
  const [productOptions, setProductsOptions] = useState('');
  const [supplierOptions, setSupplierOptions] = useState('');
  const [statusOptions, setStatusOptions] = useState('');
  const [openModalInfo, setOpenModalInfo] = useState('');

  const toggleInfo = (url, id) => {
    setOpenModalInfo(!openModalInfo)
    console.log(url)
    console.log(id)
    setIdAux(id)
    setUrlAux(url)
  };

  async function loadData(clean) {
    let productList = [];
    let materialList = [];
    let start = new Date("08 28, 2023").toISOString();
    let end = new Date().toISOString();
    let startQuery = `start=${start}`;
    let endQuery = `end=${end}`;

    let query = start && end ? `?${startQuery}&${endQuery}` : start ? `?${startQuery}` : end ? `?${endQuery}` : '';
    if (!clean) {

      let supplierQuery = supplierSelected && supplierSelected.id ? `supplier=${supplierSelected.id}` : null;
      let statusQuery = statusSelected && statusSelected.id ? `status=${statusSelected.id}` : null;
      let nameQuery = nameSelected && nameSelected.id ? `name=${nameSelected.id}` : null;
      let endQuery = endDate ? `endD=${endDate}` : null;
      let checkedQuery = checked ? `checked=${checked}` : null;

      query = query.includes('?') ? query + '&' + supplierQuery : query + '?' + supplierQuery;
      query = query.includes('?') ? query + '&' + statusQuery : query + '?' + statusQuery;
      query = query.includes('?') ? query + '&' + nameQuery : query + '?' + nameQuery;
      query = query.includes('?') ? query + '&' + nameQuery : query + '?' + nameQuery;
      query = query.includes('?') ? query + '&' + endQuery : query + '?' + endQuery;
      query = query.includes('?') ? query + '&' + checkedQuery : query + '?' + checkedQuery;
    }

    await get(`${url}${query}`)
      .then(async response => {
        if (response) {
          let productListAux = [];
          let materialListAux = [];
          response.records.map(item => {
            if (item.SupplierPurchases) {
              item.SupplierAux = item.SupplierPurchases.find(supPurchase => supPurchase.purchase == item.id)
            }
            if (item.material) {
              materialList.push(item)
              let obj = {
                id: item.id,
                Fornecedor: item.SupplierAux && item.SupplierAux.Supplier && item.SupplierAux.Supplier.Person ? item.SupplierAux.Supplier.Person.name : '',
                'Telefone do Vendedor': item.SupplierAux && item.SupplierAux.Supplier && item.SupplierAux.Supplier.Person && item.SupplierAux.Supplier.Person.Contact ? item.SupplierAux.Supplier.Person.Contact.phone : '',
                'Email do Vendedor': item.SupplierAux && item.SupplierAux.Supplier && item.SupplierAux.Supplier.Person && item.SupplierAux.Supplier.Person.Contact ? item.SupplierAux.Supplier.Person.Contact.email : '',
                'Cnpj do Vendedor': item.SupplierAux && item.SupplierAux.Supplier ? item.SupplierAux.Supplier.cnpj : '',
                Material: item.Material?.name,
                'Quantidade da compra': item.quantity,
                Preço: "R$" + item.price + ",00",
                Prazo: item.end,
                Status: item.Status?.name,
                Criação: formattedDate(item.createdAt),
              }
              materialListAux.push(obj)
            } else {
              productList.push(item)
              let obj = {
                id: item.id,
                Fornecedor: item.SupplierAux && item.SupplierAux.Supplier && item.SupplierAux.Supplier.Person ? item.SupplierAux.Supplier.Person.name : '',
                'Telefone do Vendedor': item.SupplierAux && item.SupplierAux.Supplier && item.SupplierAux.Supplier.Person && item.SupplierAux.Supplier.Person.Contact ? item.SupplierAux.Supplier.Person.Contact.phone : '',
                'Email do Vendedor': item.SupplierAux && item.SupplierAux.Supplier && item.SupplierAux.Supplier.Person && item.SupplierAux.Supplier.Person.Contact ? item.SupplierAux.Supplier.Person.Contact.email : '',
                'Cnpj do Vendedor': item.SupplierAux && item.SupplierAux.Supplier ? item.SupplierAux.Supplier.cnpj : '',
                Produto: item.Product?.name,
                'Quantidade da compra': item.quantity,
                Preço: "R$" + item.price + ",00",
                Prazo: item.end,
                Status: item.Status?.name,
                Criação: formattedDate(item.createdAt),
              }
              productListAux.push(obj)
            }
            if (item.end) {
              let newDate = new Date(item.end)
              item.end = ((newDate.getDate())) + "/" + ((newDate.getMonth() + 1)) + "/" + newDate.getFullYear();
            }
          })
          setDataProduct(productList);
          setDataMaterial(materialList);
          setColumnsExcelProd(productListAux);
          setColumnsExcelMat(materialListAux);
        }
      });

  }

  function cleanFilter() {
    setSupplierSelected('');
    setStatusSelected('');
    setNameSelected('');
    setEndDate('');
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
      name: 'Produto',
      selector: row => row.Product ? row.Product.name : null,
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
      selector: row => row.SupplierAux && row.SupplierAux.Supplier.Person && row.SupplierAux.Supplier.Person ? row.SupplierAux.Supplier.Person.name : null,
      sortable: true,
    },
    {
      name: 'Prazo',
      selector: row => row.end,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status == 1 || !row.status ? "Pendente" : row.status == 2 ? "Em Andamento" : row.status == 3 ? "Concluído" : row.status == 4 ? "Negada" : "-",
      sortable: true,
    },
    {
      name: 'Ações',
      selector: row => <EditDelete id={row.id} url={url} data={dataProduct} setData={setDataProduct} completed={row.status} openModalInfo={openModalInfo} setOpenModalInfo={setOpenModalInfo} toggle={toggleInfo}/>,
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
      selector: row => row.SupplierAux && row.SupplierAux.Supplier.Person && row.SupplierAux.Supplier.Person ? row.SupplierAux.Supplier.Person.name : null,
      sortable: true,
    },
    {
      name: 'Prazo',
      selector: row => row.end,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status == 1 || !row.status ? "Pendente" : row.status == 2 ? "Em Andamento" : row.status == 3 ? "Concluído" : row.status == 4 ? "Negada" : "-",
      sortable: true,
    },
    {
      name: 'Ações',
      selector: row => <EditDelete id={row.id} url={url} data={dataMaterial} setData={setDataMaterial} completed={row.status} openModalInfo={openModalInfo} setOpenModalInfo={setOpenModalInfo} toggle={toggleInfo} />,
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
    //   when: row => row.status == 3,
    //   style: {
    //     backgroundColor: 'green',
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

  function getOptions() {
    get(`/products`)
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.name
          })
          setProductsOptions(response.records);
        }
      });
    get(`/materials`)
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.name
          })
          setMaterialsOptions(response.records);
        }
      });
    get(`/suppliers`)
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.Person.name
          })
          setSupplierOptions(response.records);
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

  useEffect(() => {
    getOptions();
    loadData();
  }, [])
  useEffect(() => {
    cleanFilter()
  }, [checked])

  return (
    <Container>
      <HeaderContent title="Compras" icon={<ShoppingCart fontSize="large" />} titleButton="Nova Compra" linkTo="/purchases/novo" />
      <FilterContent columnsExcel={!checked ? columnsExcelProd : columnsExcelMat} filesheet={!checked ? "Compras de Produtos" : "Compras de Materiais"} fileName={!checked ? "salesProducts.xlsx" : "salesMaterials.xlsx"} loadData={() => loadData()} cleanFilter={() => cleanFilter()}>
        {!checked ?
          <InputFormFilter options={productOptions} selected={nameSelected} setSelected={setNameSelected} value={nameSelected} setValue={setNameSelected} title="Produto" type='select' size="small"></InputFormFilter>
          :
          <InputFormFilter options={materialsOptions} selected={nameSelected} setSelected={setNameSelected} value={nameSelected} setValue={setNameSelected} title="Material" type='select' size="small"></InputFormFilter>
        }
        <InputFormFilter options={supplierOptions} selected={supplierSelected} setSelected={setSupplierSelected} value={supplierSelected} setValue={setSupplierSelected} title="Fornecedor" type='select' size="small"></InputFormFilter>
        <InputFormFilter options={statusOptions} selected={statusSelected} setSelected={setStatusSelected} value={statusSelected} setValue={setStatusSelected} title="Status" type='select' size="small"></InputFormFilter>
        {/* <InputFormFilter value={endDate} setValue={setEndDate} title="Prazo" type='date' size="small"></InputFormFilter> */}
      </FilterContent>
      <ListContent
        columns={!checked ? columns : columnsMaterial}
        data={!checked ? dataProduct : dataMaterial}
        customStyles={customStyles}
        swicth={true}
        checked={checked}
        setChecked={setChecked}
        conditionalRowStyles={conditionalRowStyles}
      />
       {/* <Purchase isModal  openModalInfo={openModalInfo} setOpenModalInfo={setOpenModalInfo} toggle={toggle}/> */}
       <Purchase isModal idAux={idAux} urlAux={urlAux} openModalInfo={openModalInfo} setOpenModalInfo={setOpenModalInfo} toggle={toggleInfo}/>
    </Container>
  )

}

export default PurchaseList;
