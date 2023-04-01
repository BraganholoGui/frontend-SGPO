import { useEffect } from 'react';
import { useState } from 'react';
import * as S from './style';

function InputForm(props) {
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    setSize(props.size);
    setType(props.type);
    setTitle(props.title);
  }, [])

  return (
    <>
      {
        size == 'small' ?
          <>
            <S.InputSmall
              type={type}
            />
          </>
          :
          size == 'medium' ?
            null : null

      }

    </>

  )

}

export default InputForm;
