import HeaderContent from '../../../components/HeaderContent';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import DataTable from 'react-data-table-component';
import { get } from '../../../services/actions';
import api from '../../../services/api'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
      contact:{
          id:data.Person && data.Person.Contact ? data.Person.Contact.id : null,
          email:email,
          phone:phone,
      },
      person:{
          id:data.Person ? data.Person.id : null,
          name:name
      },
      access_name:accessName,
      password:password,
      team:1,
      role:1
  }

    return obj
  }

  useEffect(() => {
    loadData();
  }, [])

  useEffect(() => {
    setName(data.Person && data.Person ? data.Person.name : '');
    setPassword(data.password_hash);
    setAccessName(data.access_name);
    setEmail(data.Person && data.Person.Contact ? data.Person.Contact.email : '');
    setPhone(data.Person && data.Person.Contact ? data.Person.Contact.phone : '');
    setTeam(data.Team ? data.Team.name : '');
    setRole(data.Role ? data.Role.name : '');
  }, [data])

  return (
    <S.Container>
      <HeaderContent id={id} titleButton="Voltar" linkTo="/users" title={id == "novo" ? "Novo Usuário" : "Editar Usuário"} icon={<Person fontSize="large" />} />
      <FormContent>
        <S.ContentBox>
          <InputForm value={accessName} title="Nome de acesso" type='text' size="small"></InputForm>
          <InputForm value={password} title="Senha" type='password' size="small"></InputForm>
          <InputForm value={name} title="Nome" type='text' size="small"></InputForm>
        </S.ContentBox>
        <S.ContentBox>
          <InputForm value={email} title="Email" readOnly={true} type='text' size="small"></InputForm>
          <InputForm value={phone} title="Telefone" type='teext' size="small"></InputForm>
          <InputForm value={team} title="Time" type='text' size="small"></InputForm>
        </S.ContentBox>
        <S.ContentBox>
          <InputForm value={role} title="Cargo" type='text' size="small"></InputForm>
        </S.ContentBox>
        <ButtonForm url={url} obj={buildSubmitObj()} />
      </FormContent>
    </S.Container>
  )

}
export default User;
