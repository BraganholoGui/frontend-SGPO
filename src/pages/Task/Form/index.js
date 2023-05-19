import HeaderContent from '../../../components/HeaderContent';
import { Person } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';

function Task() {
  const { id } = useParams();
  const url = '/tasks';
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [end, setEnd] = useState('12/12/2022');
  const [themeSelected, setThemeSelected] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null);
  const [prioritySelected, setPrioritySelected] = useState(null);

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
      name:name,
      description:description,
      user:userSelected ? userSelected.id : null,
      start: new Date(),
      end:end,
      theme: themeSelected ? themeSelected.id : null,
      created_by:1,
      status: statusSelected ? statusSelected.id : null,
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
          if(data && data.theme){
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
          if(data && data.user){
            setUserSelected(response.records.find(item => item.id == data.user))
          }
        }
      });
    get(`/status`) 
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.name
          })
          setStatusOptions(response.records);
          if(data && data.status){
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
          if(data && data.priority){
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
    setName(data.name );
    setDescription(data.description );
    getOptions();
  }, [data])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/tasks" title={id == "novo" ? "Novo Tarefa" : "Editar Tarefa"} icon={<Person fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm value={name} setValue={setName} title="Nome" type='text' size="small"></InputForm>
            <InputForm value={end} setValue={setEnd} title="Prazo" type='date' size="small"></InputForm>
            <InputForm options={themeOptions} selected={themeSelected} setSelected={setThemeSelected} value={themeSelected} setValue={setThemeSelected} title="Tema" type='select' size="small"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            <InputForm value={description} setValue={setDescription} title="Descrição" type='textarea' size="medium"></InputForm>
            <InputForm options={userOptions} selected={userSelected} setSelected={setUserSelected} value={userSelected} setValue={setUserSelected} title="Usuário" type='select' size="small"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            {/* <InputForm options={statusOptions} selected={statusSelected} setSelected={setStatusSelected} value={statusSelected} setValue={setStatusSelected} title="Status(alterar para radio btton)" type='select' size="small"></InputForm> */}
            <InputForm options={priorityOptions} selected={prioritySelected} setSelected={setPrioritySelected} value={prioritySelected} setValue={setPrioritySelected} title="Prioridade" type='select' size="small"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default Task;