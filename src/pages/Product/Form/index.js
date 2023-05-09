import HeaderContent from '../../../components/HeaderContent';
import { Person } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';

function Product() {
  const { id } = useParams();
  const url = '/products';
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  async function loadData() {
    if (id != 'novo') {
      get(`/products/${id}`)
        .then(async response => {
          if (response) {
            console.log(response)
            setData(response.product);
          }
        });
    } 
  }

  function buildSubmitObj() {
    let obj = {
      name:name,
      price: price,
      description:description
    }

    return obj;
  }

  useEffect(() => {
    loadData();
  }, [])


  useEffect(() => {
    console.log(data)
    setName(data.name );
    setDescription(data.description);
    setPrice(data.price);
  }, [data])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/products" title={id == "novo" ? "Novo Produto" : "Editar Produto"} icon={<Person fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm value={name} setValue={setName} title="Nome" type='text' size="medium"></InputForm>
            <InputForm value={price} setValue={setPrice} title="Preço" type='text' size="medium"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            <InputForm value={description} setValue={setDescription} title="Descrição" type='textarea' size="large"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default Product;
