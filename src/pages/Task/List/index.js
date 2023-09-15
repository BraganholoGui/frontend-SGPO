import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Task } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';
import ListContentKanban from '../../../components/ListContentKanban';
import { formattedDate } from '../../../GeneralFunctions/functions';
import FilterContent from '../../../components/FilterContent';

function TaskKanban() {
  const [data, setData] = useState([]);
  const [columnsExcel, setColumnsExcel] = useState(false);
  const { id } = useParams();
  const url = `/tasks`
  const urlUserTasks = `/user-tasks`
  const location = useLocation();
  const [user, setUser] = useState(true);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, []);

  async function loadData(clean) {
    let userAux = JSON.parse(localStorage.getItem('user'))
    if(userAux.Role.status ==4){

      await get(url)
      .then(async response => {
        let list = [];
        if (response) {
          response.records.map(item =>{
            item.details = item.description
            let obj = {
              id: item.id,
              Time: item.name,
              Criação: formattedDate(item.createdAt),
            }
            list.push(obj)
          })
          setData(response.records);
          setColumnsExcel(list);
        }
      });
    }else{
      await get(`${urlUserTasks}/${userAux.id}`)
      .then(async response => {
        if (response) {
          response.records.map(item =>{
            item.details = item.description
          })
          console.log(response)
          setData(response.records);
        }
      });
    }

  }

  useEffect(() => {
    loadData();
  }, [])

  function cleanFilter(){
    loadData(true);
  }

  return (
    <Container>
      <HeaderContent title="Tarefas" icon={<Task fontSize="large" />} titleButton="Nova Tarefa" linkTo="/tasks/novo" />
      <FilterContent columnsExcel={columnsExcel} filesheet={"Tarefas"} fileName={"tasks.xlsx"} loadData={() => loadData()} cleanFilter={() => cleanFilter()}>
       {/* <InputFormFilter options={supplierOptions} selected={supplierSelected} setSelected={setSupplierSelected} value={supplierSelected} setValue={setSupplierSelected} title="Fornecedor" type='select' size="small"></InputFormFilter>  */}
      </FilterContent>
      <ListContentKanban data={data} setData={setData}/>

    </Container>
  )

}

export default TaskKanban; 
