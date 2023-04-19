import HeaderContent from '../../../components/HeaderContent';
import { Person } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';

function User() {
  const { id } = useParams();
  const url = '/users';
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [accessName, setAccessName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [team, setTeam] = useState('');
  const [role, setRole] = useState('');

  const [roleOptions, setRoleOptions] = useState('');
  const [teamOptions, setTeamOptions] = useState('');


  async function loadData() {
    if (id != 'novo') {
      get(`/users/${id}`)
        .then(async response => {
          if (response) {
            setData(response.user);
          }
        });
    }
  }

  function buildSubmitObj() {
    let obj = {
      contact: {
        id: data.Person && data.Person.Contact ? data.Person.Contact.id : null,
        email: email,
        phone: phone,
      },
      person: {
        id: data.Person ? data.Person.id : null,
        name: name
      },
      access_name: accessName,
      password: password,
      team: team ? team.id : null,
      role: role ? role.id :  null,
    }

    return obj;
  }

  function getOptions(){
    get(`/roles`)
    .then(async response => {
      if (response) {
        response.records.map(item =>{
          item.value = item.id;
          item.label = item.id +'. ' + item.name
        })
        setRoleOptions(response.records);
      }
    });
    get(`/teams`)
    .then(async response => {
      if (response) {
        response.records.map(item =>{
          item.value = item.id;
          item.label = item.id +'. ' + item.name
        })
        setTeamOptions(response.records);
      }
    });

  }

  useEffect(() => {
    loadData();
    getOptions();
  }, [])


  useEffect(() => {
    setName(data.Person && data.Person ? data.Person.name : '');
    setPassword(data.password_hash);
    setAccessName(data.access_name);
    setEmail(data.Person && data.Person.Contact ? data.Person.Contact.email : '');
    setPhone(data.Person && data.Person.Contact ? data.Person.Contact.phone : '');
    let roleSelected;
    let teamSelected;
    if(teamOptions.length > 0 && data.Team){
      teamSelected = teamOptions.find(item =>item.id == data.Team.id)
    }
    if(roleOptions.length > 0 && data.Role){
      roleSelected = roleOptions.find(item =>item.id == data.Role.id)
    }
    setTeam(teamSelected);
    setRole(roleSelected);
  }, [data, teamOptions, roleOptions])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/users" title={id == "novo" ? "Novo Usuário" : "Editar Usuário"} icon={<Person fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm value={accessName} setValue={setAccessName} title="Nome de acesso" type='text' size="small"></InputForm>
            <InputForm value={name} setValue={setName} title="Nome" type='text' size="small"></InputForm>
            <InputForm value={email} setValue={setEmail} title="Email" type='text' size="small"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            <InputForm value={phone} setValue={setPhone} title="Telefone" type='teext' size="small"></InputForm>
            <InputForm options={teamOptions} selected={team} setSelected={setTeam} value={team} setValue={setTeam} title="Time" type='select' size="small"></InputForm>
            <InputForm options={roleOptions} selected={role} setSelected={setRole} value={role} setValue={setRole} title="Cargo" type='select' size="small"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            redefinir senha
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default User;
