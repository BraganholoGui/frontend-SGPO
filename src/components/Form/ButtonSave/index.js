import { useState } from 'react';
import { useEffect } from 'react';
import * as S from './style';
import { put, post } from '../../../services/actions'
import { useHistory, useParams } from 'react-router-dom';
import { toast } from '../../../GeneralFunctions/functions'
import {Loading} from '../../Loading';
import { height } from '@mui/system';

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

  function handleSubmit(url) {
    console.log(obj)
    setLoading(true)
    if (id != 'novo') {
      put(`${url}/${id}`, obj)
        .then(() => {
          toast('success', `Atualizado com sucesso!`);
          history.goBack()
          setLoading(false)

        }).catch((err) => {
          toast('error', err.reason || `Error ao atualizar o registro :(`);
        });
    } else {
      post(url, obj)
        .then(() => {
          toast('success', `Salvo com sucesso!`);
          setLoading(false)
          history.goBack();

        }).catch((err) => {
          toast('error', err.reason || `Error ao salvar o registro :(`);
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
