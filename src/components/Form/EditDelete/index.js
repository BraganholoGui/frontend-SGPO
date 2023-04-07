import { useState } from 'react';
import { useEffect } from 'react';
import * as S from './style';
import { put, post } from '../../../services/actions'
import { useHistory, useParams } from 'react-router-dom';
import { toast } from '../../../GeneralFunctions/functions'
import {Edit, DeleteTwoTone} from '@mui/icons-material';
import {LoadingSmall} from '../../Loading';

function EditDelete(props) {
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');
  const [deleteItem, setDeleteitem] = useState(false);

  useEffect(() => {
    setId(props.id)
    setUrl(props.url)
}, [props])

  return (
    <S.Container>
     <Edit color='primary'><a href={`${url}/${id}`}></a></Edit>
     <S.Button onClick={() => setDeleteitem(true)}><DeleteTwoTone color='warning'></DeleteTwoTone></S.Button>
     {
      deleteItem ?
      <LoadingSmall></LoadingSmall>
      : null
     }
    </S.Container>
  )

}

export default EditDelete;
