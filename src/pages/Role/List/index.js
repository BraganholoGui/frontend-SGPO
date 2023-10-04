import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Psychology } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation, useRouteMatch } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';
import FilterContent from '../../../components/FilterContent';
import InputFormFilter from '../../../components/Form/InputFormFilter';
import { formattedDate } from '../../../GeneralFunctions/functions';

function RoleList() {
  const [data, setData] = useState([]);
  const [columnsExcel, setColumnsExcel] = useState([]);
  const [statusOptions, setStatusOptions] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState([]);
  const {id} = useParams();
  const url = `/roles`
  const location = useLocation();

  async function loadData(clean) {
    let start = new Date().toISOString() ;
    let end = new Date().toISOString();
    let startQuery = `start=${start}`;
    let endQuery = `end=${end}`;
    
    
    let query = start && end ? `?${startQuery}&${endQuery}` : start ? `?${startQuery}` : end ? `?${endQuery}` : '';
    if(!clean){

      let roleQuery = role  ? `role=${role}` : null;
      let statusQuery = status && status.id ? `status=${status.id}` : null;
  
      query = query.includes('?') ? query + '&' + roleQuery : query + '?' + roleQuery;
      query = query.includes('?') ? query + '&' + statusQuery : query + '?' + statusQuery;
    }
    
    get(`${url}${query}`)
      .then(async response => {
        if (response) {
          setData(response.records);
          let listAux = []
          response.records.map(item => {
            let obj = {
              id: item.id,
              Cargo: item.name,
              Permissão: item.Status?.name,
              Criação: formattedDate(item.createdAt),
            }
            listAux.push(obj)
          })
          setColumnsExcel(listAux)
        }
      });
  }

  const columns = [
    {
      name: 'ID',
      selector: row =>  row.id,
      sortable: true,
      center:true
    },
    {
      name: 'Cargo',
      selector: row =>  row.name,
      sortable: true,
    },
    {
      name: 'Permissão',
      selector: row =>  row.Status?.name,
      sortable: true,
    },
    {
      name: 'Ações',
      selector: row => <EditDelete id={row.id} url={url} data={data} setData={setData}/>,
      center:true,
      style: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
      },
    },
  ];

  function getOptions() {
    get(`/status`) 
    .then(async response => {
      if (response && response.records) {
        response.records = response.records.filter(item => item.id_permission);
        response.records.map(item => {
          item.value = item.id;
          item.label = item.id + '. ' + item.name
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
      loadData();
      getOptions();
  }, [location.key])

  function cleanFilter(){
    setRole('');
    setStatus('');
    loadData(true);
  }

  return (
    <Container>
      <HeaderContent title="Cargos" icon={<Psychology fontSize="large"/>} titleButton="Novo Cargo" linkTo="/roles/novo" />
      <FilterContent columnsExcel={columnsExcel} filesheet={"Cargo"} fileName={"roles.xlsx"} loadData={() => loadData() } cleanFilter={() => cleanFilter() }>
        <InputFormFilter value={role} setValue={setRole} title="cargo" type='text' size="medium"></InputFormFilter>
        <InputFormFilter options={statusOptions} selected={status} setSelected={setStatus} value={status} setValue={setStatus} title="Permissão" type='select' size="medium"></InputFormFilter>
        </FilterContent>
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default RoleList;
