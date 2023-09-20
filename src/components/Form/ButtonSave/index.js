import { useState } from 'react';
import { useEffect } from 'react';
import * as S from './style';
import { put, post } from '../../../services/actions'
import { useHistory, useParams } from 'react-router-dom';
import { toast } from '../../../GeneralFunctions/functions'
import {Loading} from '../../Loading';
import { ConstructionOutlined } from '@mui/icons-material';

function ButtonSave(props) {
  const { id } = useParams();
  const [url, setUrl] = useState('');
  const [obj, setObj] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  useEffect(() => {
    setUrl(props.url)
    setObj(props.obj)
  }, [props])

  async function handleSubmit(url) {
    console.log(obj)
    setLoading(true)
    let invalid = false;
    let message;

    console.log(obj)
    console.log(obj.cpf_cnpj)
    console.log(obj.cpf_cnpj.replace(/\D/g, '').length)
    console.log(obj.cpf_cnpj.replace(/\D/g, ''))
    if(!obj.is_cnpj  && obj.cpf_cnpj && (obj.cpf_cnpj.replace(/[^\d]/g, '')).length < 11) {
      invalid = true
      message =  `Digite um CPF válido!`
    }else if(obj.is_cnpj && obj.cpf_cnpj.replace(/\D/g, '').length < 14) {
      invalid = true
      message =  `Digite um CNPJ válido!`
    }else if(obj.contact && obj.contact.phone && obj.contact.phone.length < 15) {
      invalid = true
      message =  `Digite um telefone válido!`
    }else if(obj.contact && obj.contact.email && !obj.contact.email.includes("@")) {
      invalid = true
      message =  `Digite um email válido!`
    };
    if(obj.productObj && !obj.materialObj){
      if(obj.productObj.quantity == 0 || obj.productObj.quantity < parseInt(obj.quantity)){
        message = `Produto sem quantidade suficiente!`;
        invalid = true
      }
    }
    if(obj.materialObj && !obj.productObj){
      if(obj.materialObj.quantity == 0 || obj.materialObj.quantity < parseInt(obj.quantity)){
        message =  `Material sem quantidade suficiente!`;
        invalid = true
      }
    }
    if(invalid){
      toast('error', message);
      setLoading(false)
      return;
    } 
    
    if (id != 'novo') {
      await put(`${url}/${id}`, obj)
        .then(() => {
          toast('success', `Atualizado com sucesso!`);
          history.goBack()
          setLoading(false)
          
        }).catch((err) => {
          toast('error', err.response.data.error || `Error ao atualizar o registro :(`);
          setLoading(false)
        });
    } else {
      post(url, obj)
        .then(() => {
          toast('success', `Salvo com sucesso!`);
          setLoading(false)
          history.goBack();

        }).catch((err) => {
          console.log(err)
          toast('error', err.response.data.error || `Error ao salvar o registro :(`);
          setLoading(false)
        });
    }
  }

  return (
    <>
      {
        loading ?
          <>
            <S.ButtonSaveLock >
              SALVAR
            </S.ButtonSaveLock>
            <div style={{  backgroundColor: '#fff' }}>
              <Loading></Loading>

            </div>
          </>
          : <S.ButtonSave onClick={() => handleSubmit(url)} >
            SALVAR
          </S.ButtonSave>
      }
    </>
  )

}

export default ButtonSave;
