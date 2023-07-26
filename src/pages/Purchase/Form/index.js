import HeaderContent from '../../../components/HeaderContent';
import { ConstructionOutlined, Person } from '@mui/icons-material';
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
  const [end, setEnd] = useState('');
  const [productSelected, setProductSelected] = useState(null);
  const [materialSelected, setMaterialSelected] = useState(null);
  const [supplierSelected, setSupplierSelected] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null);
  const [total, setTotal] = useState(0);
  const [checked, setChecked] = useState(null);
  const [cleanValue, setCleanValue] = useState(null);
  const [completed, setCompleted] = useState(false);

  const [productOptions, setProductsOptions] = useState('');
  const [materialOptions, setMaterialOptions] = useState('');
  const [supplierOptions, setSupplierOptions] = useState('');
  const [statusOptions, setStatusOptions] = useState('');

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
      // productObj: productSelected ? productSelected : null,
      price: price,
      end: end,
      material: materialSelected ? materialSelected.id : null,
      // materialObj: materialSelected ? materialSelected : null,
      quantity: quantity,
      supplier: supplierSelected ? supplierSelected.id : null,
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
          if (data && data.material) {
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
          if (data && data.SupplierPurchases) {
            let itemFound = data.SupplierPurchases.find(supPurchase => supPurchase.purchase == id)
            setSupplierSelected(response.records.find(item => item.id == itemFound.supplier))
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
          if (data && data.status) {
            setStatusSelected(response.records.find(item => item.id == data.status))
            if(data.status == 3){
              setCompleted(true)
            }
          }
        }
      });
  }

  function calculateTotal() {
    let total = price * quantity;
    if(!total) total = 0;
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
    if (data) {
      setQuantity(data.quantity);
      setPrice(data.price);
      if (data.end) {
        let newDateFormatted = new Date(data.end).toISOString().slice(0, 10);
        setEnd(newDateFormatted);
      }
    }
  }, [data])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/purchases" title={id == "novo" ? "Nova Compra" : "Editar Compra"} icon={<Person fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <InputForm readOnly={completed} value={price} setValue={setPrice} title="Preço" type='text' size="small"></InputForm>
            <InputForm readOnly={completed} value={quantity} setValue={setQuantity} title="Quantidade" type='text' size="small"></InputForm>
            <InputForm value={total} readOnly={true} setValue={setTotal} title="Preço Total" type='text' size="small"></InputForm>
          </S.ContentBox>

          {id != "novo" ?
            <S.ContentBox>
              {
                completed ? 
                null
                :
                <SwitchMaterialProduct size="small" checked={checked} setChecked={setChecked} cleanValue={cleanValue} setCleanValue={setCleanValue} deleteValue={true}></SwitchMaterialProduct>

              }
              <InputForm readOnly={completed} value={end} setValue={setEnd} title="Prazo" type='date' size="small"></InputForm>
            </S.ContentBox>
            : null
          }
          {
            id == 'novo' ?
              <S.ContentBox>
                <SwitchMaterialProduct size="small" checked={checked} setChecked={setChecked} cleanValue={cleanValue} setCleanValue={setCleanValue} deleteValue={true}></SwitchMaterialProduct>
              </S.ContentBox>
              : null
          }

          <S.ContentBox>
            {id != "novo" ?
              <InputForm  readOnly={completed} options={statusOptions} selected={statusSelected} setSelected={setStatusSelected} value={statusSelected} setValue={setStatusSelected} title="Status" type='select' size="small"></InputForm>
              :
              <InputForm readOnly={completed} value={end} setValue={setEnd} title="Prazo" type='date' size="small"></InputForm>
            }
            {checked ?
              <InputForm readOnly={completed} options={materialOptions} selected={materialSelected} setSelected={setMaterialSelected} value={materialSelected} setValue={setMaterialSelected} title="Material" type='select' size="small"></InputForm>
              :
              <InputForm readOnly={completed} options={productOptions} selected={productSelected} setSelected={setProductSelected} value={productSelected} setValue={setProductSelected} title="Produto" type='select' size="small"></InputForm>
            }
            <InputForm readOnly={completed} options={supplierOptions} selected={supplierSelected} setSelected={setSupplierSelected} value={supplierSelected} setValue={setSupplierSelected} title="Fornecedor" type='select' size="small"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} completed={completed} />
        </FormContent>
      </S.Container>
    </>
  )

}
export default Purchase;
