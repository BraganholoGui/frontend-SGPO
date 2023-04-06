import { useEffect } from 'react';
import { useState } from 'react';
import * as S from './style';

function InputForm(props) {
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    setSize(props.size);
    setType(props.type);
    setTitle(props.title);
    setValue(props.value);
    setReadOnly(props.readOnly);
  }, [props])

  return (
    <>
      {
        size == 'small' ?
          <S.ContainerFormSmall>
            <S.Title>{title}</S.Title>
            <S.InputSmall
              type={type}
              readOnly={readOnly}
              value={value}

            />
          </S.ContainerFormSmall>
          :
          size == 'medium' ?
            <S.ContainerFormMedium>
              <S.Title>{title}</S.Title>
              <S.InputSmall
                type={type} readOnly={readOnly} value={value}
              />
            </S.ContainerFormMedium>
            :
            <S.ContainerFormBig>
              <S.Title>{title}</S.Title>
              <S.InputSmall
                value={value}
                type={type}
                readOnly
              />
            </S.ContainerFormBig>

      }

    </>

  )

}

export default InputForm;
