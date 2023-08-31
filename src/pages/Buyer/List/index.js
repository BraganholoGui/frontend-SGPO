import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';
import FilterContent from '../../../components/FilterContent';
import InputFormFilter from '../../../components/Form/InputFormFilter';
import { formattedDate } from '../../../GeneralFunctions/functions';

function BuyerList() {
  const [columnsExcel, setColumnsExcel] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const url = `/buyers`
  const location = useLocation();
  const [cnpj, setCnpj] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);

  async function loadData(clean) {
    let start = new Date().toISOString() ;
    let end = new Date().toISOString();
    let startQuery = `start=${start}`;
    let endQuery = `end=${end}`;
    
    
    let query = start && end ? `?${startQuery}&${endQuery}` : start ? `?${startQuery}` : end ? `?${endQuery}` : '';
    if(!clean){
  
      let cnpjQuery = cnpj ? `cnpj=${cnpj}` : null;
      let nameQuery = name ? `name=${name}` : null;
      let phoneQuery = phone ? `phone=${phone}` : null;
      let emailQuery = email ? `email=${email}` : null;
  
      query = query.includes('?') ? query + '&' + cnpjQuery : query + '?' + cnpjQuery;
      query = query.includes('?') ? query + '&' + nameQuery : query + '?' + nameQuery;
      query = query.includes('?') ? query + '&' + phoneQuery : query + '?' + phoneQuery;
      query = query.includes('?') ? query + '&' + emailQuery : query + '?' + emailQuery;
    }

    await get(`${url}${query}`)
      .then(async response => {
        if (response) {
          setData(response.records);
          let listAux = []
          response.records.map(item => {
            let obj = {
              id: item.id,
              Comprador: item.Person ? item.Person.name : '-',
              Cnpj: item.cpf_cnpj,
              Telefone: item.Person && item.Person.Contact ? item.Person.Contact.phone : '-',
              Email: item.Person && item.Person.Contact ? item.Person.Contact.email : '-',
              Criação: formattedDate(item.createdAt),
            }
            listAux.push(obj)
          })
          setColumnsExcel(listAux);
        }
      });

  }
  function cleanFilter(){
    setCnpj('');
    setName('');
    setPhone('');
    setEmail('');
    loadData(true);
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
      selector: row => row.cpf_cnpj,
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
      selector: row =>row.Person && row.Person.Contact ? row.Person.Contact.email : '-',
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
      <HeaderContent title="Compradores" icon={<Person fontSize="large" />} titleButton="Novo Compradores" linkTo="/buyers/novo" />
      <FilterContent columnsExcel={columnsExcel} filesheet={"Compradores"} fileName={"buyers.xlsx"} loadData={() => loadData() } cleanFilter={() => cleanFilter() }>
        <InputFormFilter value={cnpj} setValue={setCnpj} title="Cnpj" type='text' size="small"></InputFormFilter>
        <InputFormFilter value={name} setValue={setName} title="Nome" type='text' size="small"></InputFormFilter>
        <InputFormFilter value={phone} setValue={setPhone} title="Telefone" type='text' size="small"></InputFormFilter>
        <InputFormFilter value={email} setValue={setEmail} title="Email" type='text' size="small"></InputFormFilter>
      </FilterContent>
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default BuyerList;
