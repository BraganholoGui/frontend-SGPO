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
    setLoading(true)
    let invalid = false;
    if(obj.productObj && !obj.materialObj){
      if(obj.productObj.quantity == 0 || obj.productObj.quantity < parseInt(obj.quantity)){
        setLoading(false);
        toast('error', `Produto sem quantidade sulficiente!`);
        invalid = true
      }
    }
    if(obj.materialObj && !obj.productObj){
      if(obj.materialObj.quantity == 0 || obj.materialObj.quantity < parseInt(obj.quantity)){
        setLoading(false);
        toast('error', `Material sem quantidade sulficiente!`);
        invalid = true
      }
    }
    if(invalid) return;
    
    if (id != 'novo') {
      await put(`${url}/${id}`, obj)
        .then(() => {
          toast('success', `Atualizado com sucesso!`);
          history.goBack()
          setLoading(false)
          
        }).catch((err) => {
          toast('error', err.reason || `Error ao atualizar o registro :(`);
          setLoading(false)
        });
    } else {
      post(url, obj)
        .then(() => {
          toast('success', `Salvo com sucesso!`);
          setLoading(false)
          history.goBack();

        }).catch((err) => {
          toast('error', err.reason || `Error ao salvar o registro :(`);
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
