import HeaderContent from '../../../components/HeaderContent';
import { Psychology } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';

function Role() {
  const { id } = useParams();
  const url = `/roles`

  const [data, setData] = useState({});
  const [name, setName] = useState('');

  async function loadData() {
    if (id != 'novo') {
      get(`/roles/${id}`)
        .then(async response => {
          if (response) {
            setData(response.role);
          }
        });
    }
  }

  function buildSubmitObj() {
    let obj = {
      name: name,
    }
    return obj;
  }

  useEffect(() => {
    loadData();
  }, [])


  useEffect(() => {
    setName(data.name);
  }, [data])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/roles" title={id == "novo" ? "Novo Cargo" : "Editar Cargo"} icon={<Psychology fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm value={name} setValue={setName} title="Nome do cargo" type='text' size="large"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default Role;
