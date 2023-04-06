import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../ButtonLink';
import ButtonSave from '../ButtonSave';
import * as S from './style';

function ButtonForm(props) {
  const [url, setUrl] = useState('');
  const [obj, setObj] = useState('');
  useEffect(() => {
    setUrl(props.url)
    setObj(props.obj)
  }, [props])

  return (
    <S.Container>
      <S.Box>
        <ButtonSave url={url} obj={obj} />
      </S.Box>
    </S.Container>

  )

}

export default ButtonForm;
