import HeaderContent from '../../../components/HeaderContent';
import { Task } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';

function TaskForm() {
  const { id } = useParams();
  const url = '/tasks';
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [end, setEnd] = useState('');
  const [themeSelected, setThemeSelected] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const [statusSelected, setStatusSelected] = useState(1);
  const [prioritySelected, setPrioritySelected] = useState(null);
  const [teamsRelateds, setTeamsRelateds] = useState('');

  const [themeOptions, setThemeOptions] = useState('');
  const [userOptions, setUserOptions] = useState('');
  const [statusOptions, setStatusOptions] = useState('');
  const [priorityOptions, setPriorityOptions] = useState('');

  async function loadData() {
    if (id != 'novo') {
      get(`/tasks/${id}`)
        .then(async response => {
          if (response) {
            setData(response.task);
          }
        });
    }
  }

  function buildSubmitObj() {
    let obj = {
      name: name,
      description: description,
      user: userSelected ? userSelected.id : null,
      start: new Date(),
      end: new Date(end),
      theme: themeSelected ? themeSelected.id : null,
      created_by: 1,
      status: id != "novo" ? statusSelected ? statusSelected.id : null : 1,
      priority: prioritySelected ? prioritySelected.id : null,
    }
    return obj;
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
          if (data && data.theme) {
            setThemeSelected(response.records.find(item => item.id == data.theme))
          }
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
          if (data && data.user) {
            setUserSelected(response.records.find(item => item.id == data.user))
          }
        }
      });
    get(`/status`)
      .then(async response => {
        if (response && response.records) {
          response.records = response.records.filter(item => !item.id_permission);
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.name
          })
          setStatusOptions(response.records);
          if (data && data.status) {
            setStatusSelected(response.records.find(item => item.id == data.status))
          }
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
          if (data && data.priority) {
            setPrioritySelected(response.records.find(item => item.id == data.priority))
          }
        }
      });
  }

  useEffect(() => {
    loadData();
    getOptions();
  }, [])
  useEffect(() => {
    if (userSelected && userSelected.TeamUsers) {
      userSelected.TeamUsers.map(team => {
        team.value = team.team;
        team.label = team.Team.name;
      })
      setTeamsRelateds(userSelected.TeamUsers)
    }
  }, [userSelected])


  useEffect(() => {
    setName(data.name);
    setDescription(data.description);
    if (data.end) {
      let newDateFormatted = new Date(data.end).toISOString().slice(0, 10);
      setEnd(newDateFormatted);
    }
    getOptions();
  }, [data])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/tasks" title={id == "novo" ? "Novo Tarefa" : "Editar Tarefa"} icon={<Task fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm value={name} setValue={setName} title="Nome" type='text' size={id != "novo" ? "small" : 'medium'}></InputForm>
            <InputForm value={end} setValue={setEnd} title="Prazo" type='date' size={id != "novo" ? "small" : 'medium'}></InputForm>
            {
              id != "novo" ?
            <InputForm options={statusOptions} selected={statusSelected} setSelected={setStatusSelected} value={statusSelected} setValue={setStatusSelected} title="Status" type='select' size="small"></InputForm>
            : null
            }
          </S.ContentBox>
          <S.ContentBox>
            <InputForm value={description} setValue={setDescription} title="Descrição" type='textarea' size="large"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            <InputForm options={userOptions} selected={userSelected} setSelected={setUserSelected} value={userSelected} setValue={setUserSelected} title="Responsável" type='select' size="small"></InputForm>
            <InputForm options={themeOptions} selected={themeSelected} setSelected={setThemeSelected} value={themeSelected} setValue={setThemeSelected} title="Tema" type='select' size="small"></InputForm>
            <InputForm options={priorityOptions} selected={prioritySelected} setSelected={setPrioritySelected} value={prioritySelected} setValue={setPrioritySelected} title="Prioridade" type='select' size="small"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            <InputForm readOnly={true} isMulti options={[]} selected={teamsRelateds} setSelected={setTeamsRelateds} value={teamsRelateds} setValue={setTeamsRelateds} title="Times do Responsável" type='select' size="large"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default TaskForm;
