import HeaderContent from '../../../components/HeaderContent';
import { Person } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';
import SwitchMaterialProduct from '../../../components/Switch/MaterialProduct';

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
  const [supplierSelected, setSupplierSelected] = useState(null);
  const [total, setTotal] = useState(null);
  const [checked, setChecked] = useState(null);
  const [cleanValue, setCleanValue] = useState(null);

  const [productOptions, setProductsOptions] = useState('');
  const [materialOptions, setMaterialOptions] = useState('');
  const [supplierOptions, setSupplierOptions] = useState('');

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
      supplier: supplierSelected ? supplierSelected.id :  null,
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
            setChecked(false)
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
            setChecked(true)
          }
        }
      });
    get(`/suppliers`) 
      .then(async response => {
        if (response && response.records) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.Person.name
          })
          setSupplierOptions(response.records);
          if(data && data.SupplierPurchases){
            let itemFound = data.SupplierPurchases.find(supPurchase => supPurchase.purchase == id)
            setSupplierSelected(response.records.find(item => item.id == itemFound.supplier))
          }
        }
      });
  }

  function calculateTotal(){
    let total = price * quantity;

    setTotal(total)
  }

  useEffect(() => {
    loadData();
    getOptions()
  }, [])
  useEffect(() => {
    calculateTotal()
  }, [price, quantity])
  
  
  useEffect(() => {
    setProductSelected(null)
    setMaterialSelected(null)
  }, [cleanValue])


  useEffect(() => {
    getOptions()
    setQuantity(data.quantity);
    setPrice(data.price);
  }, [data])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/sales" title={id == "novo" ? "Nova Venda" : "Editar Venda"} icon={<Person fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm value={price} setValue={setPrice} title="Preço" type='text' size="small"></InputForm>
            <InputForm value={quantity} setValue={setQuantity} title="Quantidade" type='text' size="small"></InputForm>
            <InputForm value={total} readOnly={true} setValue={setTotal} title="Preço Total" type='text' size="small"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            <SwitchMaterialProduct size="small" checked={checked} setChecked={setChecked} cleanValue={cleanValue} setCleanValue={setCleanValue}></SwitchMaterialProduct>
            { checked ? 
            <InputForm options={materialOptions} selected={materialSelected} setSelected={setMaterialSelected} value={materialSelected} setValue={setMaterialSelected} title="Material" type='select' size="small"></InputForm>
            :
            <InputForm options={productOptions} selected={productSelected} setSelected={setProductSelected} value={productSelected} setValue={setProductSelected} title="Produto" type='select' size="small"></InputForm>
          }
            <InputForm options={supplierOptions} selected={supplierSelected} setSelected={setSupplierSelected} value={supplierSelected} setValue={setSupplierSelected} title="Fornecedor" type='select' size="small"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default Purchase;
