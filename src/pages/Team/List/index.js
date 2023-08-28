import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Groups } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation, useRouteMatch } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';
import FilterContent from '../../../components/FilterContent';
import InputFormFilter from '../../../components/Form/InputFormFilter';

function TeamList() {
  const [data, setData] = useState([]);
  const [columnsExcel, setColumnsExcel] = useState([]);
  const [team, setTeam] = useState(null);
  const {id} = useParams();
  const url = `/teams`
  const location = useLocation();

  async function loadData(clean) {
    let start = new Date().toISOString() ;
    let end = new Date().toISOString();
    let startQuery = `start=${start}`;
    let endQuery = `end=${end}`;
    
    
    let query = start && end ? `?${startQuery}&${endQuery}` : start ? `?${startQuery}` : end ? `?${endQuery}` : '';
    if(!clean){
  
      let teamQuery = team ? `team=${team}` : null;
  
      query = query.includes('?') ? query + '&' + teamQuery : query + '?' + teamQuery;
    }

    get(`${url}${query}`)
      .then(async response => {
        if (response) {
          setData(response.records);
          setColumnsExcel(response.records);
        }
      });
  }

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      center:true
    },
    {
      name: 'Time',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Editar/Deletar',
      selector: row => <EditDelete id={row.id} url={url} data={data} setData={setData}/>,
      center:true,
      style: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
      },
    },
  ];

  function cleanFilter(){
    setTeam('');
    loadData(true);
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
  }, [location.key])

  return (
    <Container>
      <HeaderContent title="Times" icon={<Groups fontSize="large"/>} titleButton="Novo Time" linkTo="/teams/novo" />
      <FilterContent columnsExcel={columnsExcel} filesheet={"Times"} fileName={"teams.xlsx"} loadData={() => loadData() } cleanFilter={() => cleanFilter() }>
        <InputFormFilter value={team} setValue={setTeam} title="Nome de acesso" type='text' size="medium"></InputFormFilter>
      </FilterContent>
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default TeamList;
