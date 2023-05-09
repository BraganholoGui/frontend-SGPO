import HeaderContent from '../../../components/HeaderContent';
import { Person } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';

function  Sale() {
  const { id } = useParams();
  const url = '/sales';
  const [data, setData] = useState({});
  const [product, setProduct] = useState('');
  const [buyer, setBuyer] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  async function loadData() {
    if (id != 'novo') {
      get(`/sales/${id}`)
        .then(async response => {
          if (response) {
            setData(response.sale);
          }
        });
    } 
  }

  function buildSubmitObj() {
    let obj = {
      product:product,
      price: price,
      buyer:buyer,
      quantity:quantity,
    }
    console.log(obj)
    return obj;
  }

  useEffect(() => {
    loadData();
  }, [])


  useEffect(() => {
    setProduct(data.product );
    setBuyer(data.buyer);
    setQuantity(data.quantity);
    setPrice(data.price);
  }, [data])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/sales" title={id == "novo" ? "Nova Venda" : "Editar Venda"} icon={<Person fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm value={product} setValue={setProduct} title="Produto" type='text' size="medium"></InputForm>
            <InputForm value={price} setValue={setPrice} title="Preço" type='text' size="medium"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            <InputForm value={quantity} setValue={setQuantity} title="Quantidade" type='text' size="medium"></InputForm>
            <InputForm value={buyer} setValue={setBuyer} title="Comprador" type='text' size="medium"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default  Sale;
