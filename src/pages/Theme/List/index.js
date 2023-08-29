import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { AccountTree } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';
import FilterContent from '../../../components/FilterContent';
import InputFormFilter from '../../../components/Form/InputFormFilter';
import { formattedDate } from '../../../GeneralFunctions/functions';

function ThemeList() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const url = `/themes`
  const location = useLocation();
  const [columnsExcel, setColumnsExcel] = useState([]);
  const [theme, setTheme] = useState(null);

  async function loadData(clean) {
    let start = new Date().toISOString() ;
    let end = new Date().toISOString();
    let startQuery = `start=${start}`;
    let endQuery = `end=${end}`;
    
    
    let query = start && end ? `?${startQuery}&${endQuery}` : start ? `?${startQuery}` : end ? `?${endQuery}` : '';
    if(!clean){
  
      let themeQuery = theme ? `theme=${theme}` : null;
  
      query = query.includes('?') ? query + '&' + themeQuery : query + '?' + themeQuery;
    }

    get(`${url}${query}`)
      .then(async response => {
        if (response) {
          setData(response.records);
          let list = [];
          response.records.map(item => {
            let obj = {
              id: item.id,
              Tema: item.name,
              Criação: formattedDate(item.createdAt),
            }
            list.push(obj)
          })
          setColumnsExcel(list);
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
      name: 'Nome',
      selector: row => row.name,
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

  function cleanFilter(){
    setTheme('');
    loadData(true);
  }

  return (
    <Container>
      <HeaderContent title="Temas" icon={<AccountTree fontSize="large" />} titleButton="Novo Tema" linkTo="/themes/novo" />
      <FilterContent columnsExcel={columnsExcel} filesheet={"Temas"} fileName={"themes.xlsx"} loadData={() => loadData() } cleanFilter={() => cleanFilter() }>
        <InputFormFilter value={theme} setValue={setTheme} title="Tema" type='text' size="medium"></InputFormFilter>
      </FilterContent>
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default ThemeList;
