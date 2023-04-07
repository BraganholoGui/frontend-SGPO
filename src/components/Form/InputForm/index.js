import { useEffect } from 'react';
import { useState } from 'react';
import SelectOptions from '../Select';
import * as S from './style';

function InputForm(props) {
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSize(props.size);
    setType(props.type);
    setTitle(props.title);
    setValue(props.value);
    setOptions(props.options);
    setSelected(props.selected);
    setReadOnly(props.readOnly);
  }, [props])

  return (
    <>
      {
        size == 'small' ?
          <S.ContainerFormSmall>
            <S.Title>{title}</S.Title>
            {
              type == 'select' ?
                <SelectOptions options={options} selected={selected}  />
                :
                <S.Input
                  type={type}
                  readOnly={readOnly}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                    props.setValue(e.target.value)
                  }}
                  selected={selected}
                />
            }

          </S.ContainerFormSmall>
          :
          size == 'medium' ?
            <S.ContainerFormMedium>
              <S.Title>{title}</S.Title>
              {
                type == 'select' ?
                  <SelectOptions options={options} selected={selected}/>
                  :
                  <S.Input
                    type={type} readOnly={readOnly} value={value} onChange={(e) => {
                      setValue(e.target.value)
                      props.value = e.target.value
                    }}
                  />
              }
            </S.ContainerFormMedium>
            :
            <S.ContainerFormBig>
              <S.Title>{title}</S.Title>
              {
                type == 'select' ?
                  <SelectOptions options={options} selected={selected}/>
                  :
                  <S.Input
                    value={value}
                    type={type}
                    onChange={(e) => {
                      setValue(e.target.value)
                      props.value = e.target.value
                    }}
                    readOnly={readOnly}
                  />
              }
            </S.ContainerFormBig>

      }
    </>

  )

}

export default InputForm;
