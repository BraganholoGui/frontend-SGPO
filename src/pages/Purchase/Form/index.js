import HeaderContent from '../../../components/HeaderContent';
import { Person } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';

function Purchase() {
  const { id } = useParams();
  const url = '/purchases';
  const [data, setData] = useState({});
  const [product, setProduct] = useState('');
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [productSelected, setProductSelected] = useState(null);
  const [materialSelected, setMaterialSelected] = useState(null);

  const [productOptions, setProductsOptions] = useState('');
  const [materialOptions, setMaterialOptions] = useState('');

  async function loadData() {
    if (id != 'novo') {
      get(`/purchases/${id}`)
        .then(async response => {
          if (response) {
            setData(response.purchase);
          }
        });
    }
  }

  function buildSubmitObj() {
    let obj = {
      product: productSelected ? productSelected.id : null,
      price: price,
      material: materialSelected ? materialSelected.id :  null,
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
    get(`/materials`) 
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.name
          })
          setMaterialOptions(response.records);
          if(data && data.material){
            setMaterialSelected(response.records.find(item => item.id == data.material))
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
            Switch material or product
            <InputForm options={materialOptions} selected={materialSelected} setSelected={setMaterialSelected} value={materialSelected} setValue={setMaterialSelected} title="Material" type='select' size="small"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default Purchase;
