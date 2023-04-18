import { useEffect } from 'react';
import { useState } from 'react';
import * as S from './style';
import Select from 'react-select'
import { theme } from '../../../theme';


function InputForm(props) {
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isMulti, setIsMulti] = useState(false);

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white',
      //  background-color: ${(props) => (props.readOnly ? `${theme.inputLock}`: `${theme.input}`)};
      borderRadius: '10px',
      border: '2px solid #ccc',
      boxShadow: '2px 2px 3px #ccc',
      height: '50px',
      fontFamily: ' Arial, sans-serif',
      fontSize: '16px',
      color: '#333',
      transition: 'all 0.9s ease-in-out',
      ':focus': {
        ...styles[':focus'],
        border: ` border: 2px solid ${theme.primaryDark}`,
        transition: 'all 0.9s ease -in -out'
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        borderRadius: '10px',
        border: '2px solid #ccc',
        boxShadow: '2px 2px 3px #ccc',

      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        border:`1px solid ${theme.lastDark}`,
        backgroundColor:`${theme.inputLock}`,
        borderRadius:'20px'
        
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      ':hover': {
        color: 'red',
      },
    }),
    // input: (styles) => ({ ...styles, ...dot() }),
    // placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  useEffect(() => {
    setSize(props.size);
    setType(props.type);
    setTitle(props.title);
    setValue(props.value);
    setOptions(props.options);
    setSelected(props.selected);
    setReadOnly(props.readOnly);
    setIsMulti(props.isMulti);
  }, [props])

  return (
    <>
      {
        size == 'small' ?
          <S.ContainerFormSmall>
            <S.Title>{title}</S.Title>
            {
              type == 'select' ?
                <Select options={options} selected={selected}
                  styles={colourStyles}
                  setSelected={setSelected} value={selected}
                  isMulti={isMulti}
                  isClearable={isMulti &&  Array.isArray(value)  ? value.some((v) => !v.isFixed) : ''}
                    onChange={(e) => {
                      if(isMulti){
                        setSelected(e)
                        setValue(e)
                        props.setValue(e)
                        props.setSelected(e)
                      }else{
                        setSelected(e.id)
                        setValue(e.id)
                        props.setValue(e.id)
                        props.setSelected(e.id)
                      }

                    }}/>
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
                  <Select options={options} selected={selected}
                    styles={colourStyles}
                    setSelected={setSelected} value={selected}
                    isMulti={isMulti}
                    isClearable={isMulti && Array.isArray(value) ? value.some((v) => !v.isFixed) : null}

                    onChange={(e) => {
                      if(isMulti){
                        setSelected(e)
                        setValue(e)
                        props.setValue(e)
                        props.setSelected(e)
                      }else{
                        setSelected(e.id)
                        setValue(e.id)
                        props.setValue(e.id)
                        props.setSelected(e.id)
                      }

                    }} />
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
            </S.ContainerFormMedium>
            :
            <S.ContainerFormBig>
              <S.Title>{title}</S.Title>
              {
                type == 'select' ?
                  <Select options={options} selected={selected}
                    styles={colourStyles}
                    setSelected={setSelected} value={selected}
                    isMulti={isMulti}
                    isClearable={isMulti && Array.isArray(value)  ? value.some((v) => !v.isFixed) : null}

                    onChange={(e) => {
                      if(isMulti){
                        setSelected(e)
                        setValue(e)
                        props.setValue(e)
                        props.setSelected(e)
                      }else{
                        setSelected(e.id)
                        setValue(e.id)
                        props.setValue(e.id)
                        props.setSelected(e.id)
                      }

                    }}/>
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
