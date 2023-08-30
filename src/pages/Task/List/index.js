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

function TaskKanban() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  const url = `/tasks`
  const location = useLocation();

  async function loadData() {
    await get(url)
      .then(async response => {
        if (response) {
         response.records.map(item =>{
            item.details = item.description
          })
          setData(response.records);
        }
      });

  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Container>
      <HeaderContent title="Tarefas" icon={<Task fontSize="large" />} titleButton="Nova Tarefa" linkTo="/tasks/novo" />
      {/* <FilterContent columnsExcel={columnsExcel} filesheet={"Tarefas"} fileName={"tasks.xlsx"} loadData={() => loadData()} cleanFilter={() => cleanFilter()}> */}
        {/* <InputFormFilter options={supplierOptions} selected={supplierSelected} setSelected={setSupplierSelected} value={supplierSelected} setValue={setSupplierSelected} title="Fornecedor" type='select' size="small"></InputFormFilter>
        <InputFormFilter options={statusOptions} selected={statusSelected} setSelected={setStatusSelected} value={statusSelected} setValue={setStatusSelected} title="Status" type='select' size="small"></InputFormFilter> */}
        {/* <InputFormFilter value={endDate} setValue={setEndDate} title="Prazo" type='date' size="small"></InputFormFilter> */}
      {/* </FilterContent> */}
      <ListContentKanban data={data} setData={setData}/>

    </Container>
  )

}

export default TaskKanban; 
