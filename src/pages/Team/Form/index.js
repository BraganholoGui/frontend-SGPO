import HeaderContent from '../../../components/HeaderContent';
import { Person } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';

function Team() {
  const { id } = useParams();
  const url = `/teams-user`

  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [usersRelateds, setUsersRelateds] = useState([]);

  const [userOptions, setUserOptions] = useState('');
  const [teamOptions, setTeamOptions] = useState('');


  async function loadData() {
    if (id != 'novo') {
      get(`/teams/${id}`)
        .then(async response => {
          if (response) {
            setData(response.team);
          }
        });
    }
  }

  function buildSubmitObj() {
    let obj = {
      name: name,
      userRelateds:usersRelateds
    }
    return obj;
  }

  function getOptions(){
    get(`/users`)
    .then(async response => {
      if (response) {
        response.records.map(item =>{
          item.value = item.id;
          item.label = item.id +'. ' + item.Person.name
        })
        setUserOptions(response.records);
      }
    });

  }

  useEffect(() => {
    loadData();
    getOptions();
  }, [])


  useEffect(() => {
    setName(data.name);
  }, [data])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/users" title={id == "novo" ? "Novo Usuário" : "Editar Usuário"} icon={<Person fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm value={name} setValue={setName} title="Nome do time" type='text' size="medium"></InputForm>
            <InputForm options={userOptions} isMulti={true} selected={usersRelateds} setSelected={setUsersRelateds} value={usersRelateds} setValue={setUsersRelateds} title="Usuários relacionados" type='select' size="medium"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default Team;
