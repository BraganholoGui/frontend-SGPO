import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { Person } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import DataTable from 'react-data-table-component';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/InputsForm/InputForm';
import FormContent from '../../../components/FormContent';

function User() {
  const [data, setData] = useState([]);
  const [accessName, setAccessName] = useState('');
  const id = useParams();
  console.log(id)
  async function loadData() {
    if(id !='novo'){
      get(`/users/${id.id}`)
        .then(async response => {
          if (response) {
            console.log(response.records);
            setData(response.records);
          }
        });
    }
  }

  useEffect(() => {
    loadData();
  }, [])
  
  useEffect(() => {
    setAccessName(data.access_name);
  }, [data])

  return (
    <Container>
      <HeaderContent id={id} titleButton="Voltar" linkTo="/users" title={id == "novo" ? "Novo Usuário" : "Editar Usuário"} icon={<Person fontSize="large" />} />
      <FormContent>
        <S.ContentBox>
          <InputForm value={accessName} title="Nome de acesso" type='text' size="small"></InputForm>
          <InputForm value={123} title="Senha" type='password' size="small"></InputForm>
          <InputForm value={123} title="Nome" type='text' size="small"></InputForm>
        </S.ContentBox>
      </FormContent>
    </Container>
  )

}
export default User;
