import HeaderContent from '../../../components/HeaderContent';
import { Loyalty } from '@mui/icons-material';
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
  const [total, setTotal] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null);
  const [completed, setCompleted] = useState(false);

  const [productOptions, setProductsOptions] = useState('');
  const [buyerOptions, setBuyerOptions] = useState('');
  const [statusOptions, setStatusOptions] = useState('');

  async function loadData() {
    if (id != 'novo') {
      get(`/sales/${id}`)
        .then(async response => {
          if (response) {
            setData(response.sale);
            console.log(response.sale);
          }
        });
    }
  }

  function buildSubmitObj() {
    let obj = {
      product: productSelected ? productSelected.id : null,
      productObj: productSelected ? productSelected : null,
      price: price,
      buyer: buyerSelected ? buyerSelected.id : null,
      quantity: quantity,
      status: statusSelected ? statusSelected.id : null,
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
          if (data && data.product) {
            console.log(response.records.find(item => item.id == data.product))
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
          if (data && data.buyer) {
            setBuyerSelected(response.records.find(item => item.id == data.buyer))
          }
        }
      });

      get(`/status`)
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.value;
            item.label = item.name
          })
          setStatusOptions(response.records);
          if (data && data.Status) {
            setStatusSelected(response.records.find(item => item.id == data.status))
            if(data.status == 3){
              setCompleted(true)
            }
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

  function calculateTotal() {
    let total = price * quantity;

    setTotal(total)
  }
  useEffect(() => {
    calculateTotal()
  }, [price, quantity])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/sales" title={id == "novo" ? "Nova Venda" : "Editar Venda"} icon={<Loyalty fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm readOnly={completed} value={price} setValue={setPrice} title="Preço" type='text' size="small"></InputForm>
            <InputForm readOnly={completed} value={quantity} setValue={setQuantity} title="Quantidade" type='text' size="small"></InputForm>
            <InputForm value={total} readOnly={true} setValue={setTotal} title="Preço Total" type='text' size="small"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            {id != "novo" ?
              <InputForm readOnly={completed} options={statusOptions} selected={statusSelected} setSelected={setStatusSelected} value={statusSelected} setValue={setStatusSelected} title="Status" type='select' size="small"></InputForm>
              :
              null
            }
            <InputForm readOnly={completed} options={productOptions} selected={productSelected} setSelected={setProductSelected} value={productSelected} setValue={setProductSelected} title="Produto" type='select' size="small"></InputForm>
            <InputForm readOnly={completed} options={buyerOptions} selected={buyerSelected} setSelected={setBuyerSelected} value={buyerSelected} setValue={setBuyerSelected} title="Comprador" type='select' size="small"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} completed={completed}/>
        </FormContent>
      </S.Container>
    </>
  )

}
export default Sale;
