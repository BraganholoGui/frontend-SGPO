import { useState } from 'react';
import { useEffect } from 'react';
import * as S from './style';
import { put, post, del, get } from '../../../services/actions'
import { useHistory, useParams } from 'react-router-dom';
import { toast } from '../../../GeneralFunctions/functions'
import {
  Edit, DeleteTwoTone, Reviews, ErrorTwoTone, CheckCircleTwoTone
} from '@mui/icons-material';
import { LoadingSmall } from '../../Loading';

function EditDelete(props) {
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');
  const [data, setData] = useState('');
  const [deleteItem, setDeleteitem] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    setId(props.id)
    setUrl(props.url)
    setData(props.data)
    setCompleted(props.completed)
    setAlert(props.alert)
    console.log(props)
  }, [props])

  function updateList() {
    get(url)
      .then(async response => {
        if (response) {
          setData(response.records);
          props.setData(response.records)
        }
      });
  }

  function deleteForm(url, id) {
    setDeleteitem(true)
    del(url, id)
      .then(() => {
        toast('success', `Deletado com sucesso!`);
        setDeleteitem(false)
        updateList()
      })
      .catch(err => {
        toast('error', err.reason || `Error ao deletar o registro :(`);
        setDeleteitem(false)
      })
  }

  return (
    <S.Container>
      {completed != 3 ?
        <>
          <a href={`${url}/${id}`}><Edit color='primary'></Edit></a>
          <S.Button onClick={() => deleteForm(url, id)}><DeleteTwoTone color='warning'></DeleteTwoTone></S.Button>
          {alert ? <ErrorTwoTone style={{ cursor: 'pointer' }} onClick={() => toast('warning', `Quantidade baixa!`)} /> : null}
        </>
        :
        <S.Completed>
          <a href={`${url}/${id}`}><Reviews style={{ color: 'green' }}></Reviews></a>
          <CheckCircleTwoTone style={{ cursor: 'pointer',color: 'green' }} onClick={() => toast('success', `Compra Finalizada!`)} />
        </S.Completed>
      }
      {
        deleteItem ?
          <LoadingSmall></LoadingSmall>
          : null
      }
    </S.Container>
  )

}

export default EditDelete;
