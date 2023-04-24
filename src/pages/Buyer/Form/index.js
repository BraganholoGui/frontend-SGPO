import HeaderContent from '../../../components/HeaderContent';
import { Person } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';

function Buyer() {
  const { id } = useParams();
  const url = '/buyers';
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [cpf_cnpj, setCpfCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  async function loadData() {
    if (id != 'novo') {
      get(`/buyers/${id}`)
        .then(async response => {
          if (response) {
            setData(response.buyer);
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
      cpf_cnpj: cpf_cnpj,
      is_cnpj:true
     
    }

    return obj;
  }

  useEffect(() => {
    loadData();
  }, [])


  useEffect(() => {
    setName(data.Person && data.Person ? data.Person.name : '');
    setCpfCnpj(data.cpf_cnpj);
    setEmail(data.Person && data.Person.Contact ? data.Person.Contact.email : '');
    setPhone(data.Person && data.Person.Contact ? data.Person.Contact.phone : '');
  }, [data])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/buyers" title={id == "novo" ? "Novo Compradores" : "Editar Compradores"} icon={<Person fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm value={cpf_cnpj} setValue={setCpfCnpj} title="CPF ou CNPJ" type='text' size="medium"></InputForm>
            <InputForm value={name} setValue={setName} title="Nome" type='text' size="medium"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            <InputForm value={email} setValue={setEmail} title="Email" type='text' size="medium"></InputForm>
            <InputForm value={phone} setValue={setPhone} title="Telefone" type='text' size="medium"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default Buyer;
