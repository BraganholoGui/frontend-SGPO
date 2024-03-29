import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonDelete from '../ButtonDelete';
import ButtonSave from '../ButtonSave';
import * as S from './style';
import ButtonPassword from '../ButtonPassword';

function ButtonForm(props) {
  const { id } = useParams();
  const [url, setUrl] = useState('');
  const [obj, setObj] = useState('');

  useEffect(() => {
    setUrl(props.url)
    setObj(props.obj)
  }, [props])

  useEffect(() => {
    setUrl(props.url)
    setObj(props.obj)
  }, [])
  return (
    <S.Container>
      {
        props.completed ?
          null
          :
          <S.Box>
            {
              props.redefinePassword && id != "novo" ? 
              <ButtonPassword/> : null
            }
            {
              id != 'novo' ?
                <ButtonDelete url={url} obj={obj} />
                : null
            }
            <ButtonSave url={url} obj={obj} />
          </S.Box>
      }

    </S.Container>

  )

}

export default ButtonForm;
