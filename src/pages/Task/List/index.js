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
import InputFormFilter from '../../../components/Form/InputFormFilter';

function TaskKanban() {
  const [data, setData] = useState([]);
  const [columnsExcel, setColumnsExcel] = useState(false);
  const { id } = useParams();
  const url = `/tasks`
  const urlUserTasks = `/user-tasks`
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [themeOptions, setThemeOptions] = useState('');
  const [userOptions, setUserOptions] = useState('');
  const [priorityOptions, setPriorityOptions] = useState('');
  const [themeSelected, setThemeSelected] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const [prioritySelected, setPrioritySelected] = useState(null);
  const [description, setDescription] = useState(null);
  const [taskFilterUser, setTaskFilterUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
  }, []);

  async function loadData(clean, filt) {
    let userAux = JSON.parse(localStorage.getItem('user'))
    if (!taskFilterUser && !filt) {
      if (userAux.Role.status == 4) {
        await get(url)
          .then(async response => {
            let list = [];
            if (response) {
              response.records.map(item => {
                item.details = item.description
                let obj = {
                  id: item.id,
                  Tarefa: item.name,
                  Descrição: item.description,
                  Prazo: formattedDate(item.end),
                  Tema: item.Theme.name,
                  Responsável: item.User.Person.name,
                  'Criado Por': item.createdBy.Person.name,
                  Status: item.Status.name,
                  Prioridade: item.Priority.name,
                  Criação: formattedDate(item.createdAt),
                }
                list.push(obj)
              })
              setData(response.records);
              setColumnsExcel(list);
            }
          });
      } else {
        await get(`${urlUserTasks}/${userAux.id}`)
          .then(async response => {
            let list = [];
            if (response) {
              response.records.map(item => {
                item.details = item.description
                let obj = {
                  id: item.id,
                  Tarefa: item.name,
                  Descrição: item.description,
                  Prazo: formattedDate(item.end),
                  Tema: item.Theme.name,
                  Responsável: item.User.Person.name,
                  'Criado Por': item.createdBy.Person.name,
                  Status: item.Status.name,
                  Prioridade: item.Priority.name,
                  Criação: formattedDate(item.createdAt),
                }
                list.push(obj)
              })
              setData(response.records);
              setColumnsExcel(list);
            }
          });
      }
    } else {
      let start = new Date().toISOString();
      let end = new Date().toISOString();
      let startQuery = `start=${start}`;
      let endQuery = `end=${end}`;

      let query = start && end ? `?${startQuery}&${endQuery}` : start ? `?${startQuery}` : end ? `?${endQuery}` : '';
      if (!clean) {

        let userQuery = userSelected ? `user=${userSelected.id}` : null;
        let priorityQuery = prioritySelected ? `priority=${prioritySelected.id}` : null;
        let themeQuery = themeSelected ? `theme=${themeSelected.id}` : null;
        let descriptionQuery = description ? `description=${description}` : null;

        query = query.includes('?') ? query + '&' + userQuery : query + '?' + userQuery;
        query = query.includes('?') ? query + '&' + priorityQuery : query + '?' + priorityQuery;
        query = query.includes('?') ? query + '&' + themeQuery : query + '?' + themeQuery;
        query = query.includes('?') ? query + '&' + descriptionQuery : query + '?' + descriptionQuery;
      }

      get(`${url}${query}`)
        .then(async response => {
          let list = [];
          if (response) {
            response.records.map(item => {
              item.details = item.description.split(/\s+/).slice(0, 10).join(' ') + ' ...';
              let obj = {
                id: item.id,
                Tarefa: item.name,
                Descrição: item.description,
                Prazo: formattedDate(item.end),
                Tema: item.Theme.name,
                Responsável: item.User.Person.name,
                'Criado Por': item.createdBy.Person.name,
                Status: item.Status.name,
                Prioridade: item.Priority.name,
                Criação: formattedDate(item.createdAt),
              }
              list.push(obj)
            })
            setData(response.records);
            setColumnsExcel(list);
          }
        });
    }
  }

  function getOptions() {
    get(`/themes`)
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.name
          })
          setThemeOptions(response.records);

        }
      });
    get(`/users`)
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.Person.name
          })
          setUserOptions(response.records);

        }
      });
    get(`/priorities`)
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.name
          })
          setPriorityOptions(response.records);

        }
      });
  }

  useEffect(() => {
    loadData(false, false);
    getOptions();
  }, [])

  function cleanFilter() {
    loadData(true, false);
    setDescription('')
    setUserSelected(null)
    setPrioritySelected(null)
    setThemeSelected(null)
  }

  return (
    <Container>
      <HeaderContent title="Tarefas" icon={<Task fontSize="large" />} titleButton="Nova Tarefa" linkTo="/tasks/novo" />
      <FilterContent columnsExcel={columnsExcel} filesheet={"Tarefas"} fileName={"tasks.xlsx"} loadData={() => loadData(false, true)} cleanFilter={() => cleanFilter()}>
        <InputFormFilter value={description} setValue={setDescription} title="Nome" type='text' size="small"></InputFormFilter>
        {user.Role.status == 4 ?
          <InputFormFilter options={userOptions} selected={userSelected} setSelected={setUserSelected} value={userSelected} setValue={setUserSelected} title="Responsável" type='select' size="small"></InputFormFilter>
          : null
        }
        <InputFormFilter options={priorityOptions} selected={prioritySelected} setSelected={setPrioritySelected} value={prioritySelected} setValue={setPrioritySelected} title="Prioridade" type='select' size="small"></InputFormFilter>
        <InputFormFilter options={themeOptions} selected={themeSelected} setSelected={setThemeSelected} value={themeSelected} setValue={setThemeSelected} title="Tema" type='select' size="small"></InputFormFilter>
      </FilterContent>
      <ListContentKanban data={data} setData={setData} />

    </Container >
  )

}

export default TaskKanban; 
