import HeaderContent from '../../../components/HeaderContent';
import { Person } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';

function Sale() {
  const { id } = useParams();
  const url = '/sales';
  const [data, setData] = useState({});
  const [product, setProduct] = useState('');
  const [buyer, setBuyer] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [productSelected, setProductSelected] = useState(null);
  const [buyerSelected, setBuyerSelected] = useState(null);

  const [productOptions, setProductsOptions] = useState('');
  const [buyerOptions, setBuyerOptions] = useState('');

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
      product: productSelected ? productSelected.id : null,
      price: price,
      buyer: buyerSelected ? buyerSelected.id :  null,
      quantity: quantity,
    }
    return obj;
  }

  function getOptions() {
    get(`/products`)
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.name
          })
          setProductsOptions(response.records);
          if(data && data.product){
            setProductSelected(response.records.find(item => item.id == data.product))
          }
        }
      });
    get(`/buyers`) 
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.Person.name
          })
          setBuyerOptions(response.records);
          if(data && data.buyer){
            setBuyerSelected(response.records.find(item => item.id == data.buyer))
          }
        }
      });

    

  }

  useEffect(() => {
    loadData();
    getOptions()
  }, [])
  useEffect(() => {
    getOptions()
  }, [data])


  useEffect(() => {
    setProduct(data.product);
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
            <InputForm value={price} setValue={setPrice} title="Preço" type='text' size="medium"></InputForm>
            <InputForm value={quantity} setValue={setQuantity} title="Quantidade" type='text' size="medium"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            <InputForm options={productOptions} selected={productSelected} setSelected={setProductSelected} value={productSelected} setValue={setProductSelected} title="Produto" type='select' size="small"></InputForm>
            <InputForm options={buyerOptions} selected={buyerSelected} setSelected={setBuyerSelected} value={buyerSelected} setValue={setBuyerSelected} title="Comprador" type='select' size="small"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default Sale;
