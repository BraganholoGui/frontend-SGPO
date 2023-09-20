import { useState } from 'react';
import { useEffect } from 'react';
import * as S from './style';
import { put, post, del } from '../../../services/actions'
import { useHistory, useParams } from 'react-router-dom';
import { toast } from '../../../GeneralFunctions/functions'
import {Loading} from '../../Loading';
import { height } from '@mui/system';
import ModalDelete from '../../Modal';

function ButtonDelete(props) {
  const { id } = useParams();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [openModalDelete, setOpenModalDelete] = useState(false);

  useEffect(() => {
    setUrl(props.url)
  }, [props])

  const toggle = () => {
    setOpenModalDelete(!openModalDelete)
  };
  const allowDel = (allow) => {
    console.log(allow)
     if (allow) {
      setLoading(true)
      del(url, id)
        .then(() => {
          toast('success', `Deletado com sucesso!`);
          setLoading(false)
          setInterval(history.goBack(), 40000);
          // history.goBack();
        })
        .catch(err => {
          toast('error', err.reason || `Error ao deletar o registro :(`);
          setLoading(false)
        })
        setOpenModalDelete(false)
    }

  };

  function deleteForm(url, id) {
    toggle();
   
  }

  return (
    <>
      {
        loading ?
          <>
            <div style={{ backgroundColor: '#fff' }}>
              <Loading></Loading>

            </div>
            <S.ButtonSaveLock  >
            DELETAR
            </S.ButtonSaveLock>
          </>
          : <S.ButtonDelete onClick={() => deleteForm(url, id)} >
            DELETAR
          </S.ButtonDelete>
      }
       <ModalDelete
        openModalDelete={openModalDelete} setOpenModalDelete={setOpenModalDelete} toggle={toggle} allowDel={allowDel}
      />
    </>
  )

}

export default ButtonDelete;
