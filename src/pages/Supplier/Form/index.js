import HeaderContent from '../../../components/HeaderContent';
import { Person } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';

function Supplier() {
  const { id } = useParams();
  const url = '/suppliers';
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  async function loadData() {
    if (id != 'novo') {
      get(`/suppliers/${id}`)
        .then(async response => {
          if (response) {
            setData(response.supplier);
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
      cnpj: cnpj,
     
    }

    return obj;
  }

  useEffect(() => {
    loadData();
  }, [])


  useEffect(() => {
    setName(data.Person && data.Person ? data.Person.name : '');
    setCnpj(data.cnpj);
    setEmail(data.Person && data.Person.Contact ? data.Person.Contact.email : '');
    setPhone(data.Person && data.Person.Contact ? data.Person.Contact.phone : '');
  }, [data])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/suppliers" title={id == "novo" ? "Novo Fornecedor" : "Editar Fornecedor"} icon={<Person fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm value={cnpj} setValue={setCnpj} title="CNPJ" type='text' size="medium"></InputForm>
            <InputForm value={name} setValue={setName} title="Nome" type='text' size="medium"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            <InputForm value={email} setValue={setEmail} title="Email" type='email' size="medium"></InputForm>
            <InputForm value={phone} setValue={setPhone} title="Telefone" type='text' size="medium"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default Supplier;
