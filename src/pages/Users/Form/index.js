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
  const id = useParams();

  async function loadData() {
    get(`/users`)
      .then(async response => {
        if (response) {
          console.log(response.records);
          setData(response.records);
        }
      });
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Container>
      <HeaderContent id={id} titleButton="Voltar" linkTo="/users" title={id == "novo" ? "Novo Usuário" : "Editar Usuário"} icon={<Person fontSize="large" />} />
      <FormContent>
        <S.ContentBox>
          <InputForm title="Nome" type='password' size="small"></InputForm>
          <InputForm type='password' size="small"></InputForm>
          <InputForm type='password' size="small"></InputForm>
        </S.ContentBox>
      </FormContent>
    </Container>
  )

}
export default User;
