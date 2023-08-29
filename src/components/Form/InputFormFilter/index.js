import { useEffect } from 'react';
import { useState } from 'react';
import * as S from './style';
import Select from 'react-select'
import { theme } from '../../../theme';


function InputFormFilter(props) {
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isMulti, setIsMulti] = useState(false);
  const [min, setMin] = useState('0');
  const [max, setMax] = useState('100');

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      zIndex: 99999999,
      backgroundColor: 'white',
      //  background-color: ${(props) => (props.readOnly ? `${theme.inputLock}`: `${theme.input}`)};
      borderRadius: '10px',
      border: '2px solid #ccc',
      boxShadow: '2px 2px 3px #ccc',
      maxHeight: '14px',
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
        zIndex: 99999999,
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        border: `1px solid ${theme.lastDark}`,
        backgroundColor: `${theme.inputLock}`,
        borderRadius: '20px',
        textAlign: 'center',
        zIndex: 99999999,

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
    singleValue: (styles, { data }) => {
      return {
        ...styles,
        border: `1px solid ${theme.inputLock}`,
        backgroundColor: `${theme.bgColor}`,
        borderRadius: '20px',
        textAlign: 'center',
        width: '70%',

      };
    },
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
    setMin(props.max);
    setMax(props.min);
    console.log(props)
  }, [props])

  const getBackgroundSize = () => {
    return {
      backgroundSize: '100%',
      width: '100%',
      backgroundRepeat: 'no-repeat'
    };
  };

  return (
    <>
      {
        size == 'small' ?
          <S.ContainerFormSmall>
            {
              type == 'select' ?
                <Select options={options || []} selected={selected}
                  setSelected={setSelected} value={selected}
                  isMulti={isMulti}
                  isDisabled={readOnly}
                  placeholder={title}
                  styles={{ ...colourStyles, menuPortal: base => ({ ...base, zIndex: 99999999999 }) }}
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  isClearable={isMulti && Array.isArray(value) ? value.some((v) => !v.isFixed) : ''}
                  onChange={(e) => {
                    if (isMulti) {
                      setSelected(e)
                      setValue(e)
                      props.setValue(e)
                      props.setSelected(e)
                    } else {
                      setSelected(e)
                      setValue(e)
                      props.setValue(e)
                      props.setSelected(e)
                    }

                  }} />
                :
                type == 'radio' ?
                  <>
                    <S.RadioContainer>
                      <S.RadioLabel  for="radio-option">
                     Estoque baixo:
                      </S.RadioLabel>
                      <S.RadioInput
                      name="radio-group"
                      id="radio-option"
                        type={type}
                        readOnly={readOnly}
                        value={value}
                        onChange={(e) => {
                          setValue(false)
                          props.loadData()

                          props.setValue(false)
                        }}
                      />
                    </S.RadioContainer>
                    <S.RadioContainer>
                      <S.RadioLabel  for="radio-option2">
                     Todos:
                      </S.RadioLabel>
                      <S.RadioInput
                      name="radio-group"
                      id="radio-option2"
                        type={type}
                        readOnly={readOnly}
                        value={value}
                        onChange={(e) => {
                          setValue(true)
                          props.loadData()
                          props.setValue(true)
                        }}
                      />
                    </S.RadioContainer>
                  </>
                  :
                  <>
                    <S.Space>
                      <S.Title>
                        {type == 'range' ? <>{title}:  {value}</> : <>{title}</>}
                      </S.Title>
                    </S.Space>
                    <S.Input
                      type={type}
                      readOnly={readOnly}
                      value={value}
                      placeholder={title}
                      min='10'
                      max='500'
                      step="10"
                      style={getBackgroundSize()}
                      onChange={(e) => {
                        setValue(e.target.value)
                        props.setValue(e.target.value)
                      }}
                      selected={selected}
                    />
                  </>
            }

          </S.ContainerFormSmall>
          : size == 'medium' ?
            <S.ContainerFormMedium>
              {
                type == 'select' ?
                  <Select options={options || []} selected={selected}
                    setSelected={setSelected} value={selected}
                    isMulti={isMulti}
                    isDisabled={readOnly}
                    placeholder={title}
                    styles={{ ...colourStyles, menuPortal: base => ({ ...base, zIndex: 99999999999 }) }}
                    menuPortalTarget={document.body}
                    menuPosition={'fixed'}
                    isClearable={isMulti && Array.isArray(value) ? value.some((v) => !v.isFixed) : ''}
                    onChange={(e) => {
                      if (isMulti) {
                        setSelected(e)
                        setValue(e)
                        props.setValue(e)
                        props.setSelected(e)
                      } else {
                        setSelected(e)
                        setValue(e)
                        props.setValue(e)
                        props.setSelected(e)
                      }

                    }} />
                  :
                  <>
                    <S.Space>
                      <S.Title>
                        {type == 'range' ? <>{title}:  {value}</> : <>{title}</>}
                      </S.Title>
                    </S.Space>
                    <S.Input
                      type={type}
                      readOnly={readOnly}
                      value={value}
                      placeholder={title}
                      min='10'
                      max='500'
                      step="10"
                      style={getBackgroundSize()}
                      onChange={(e) => {
                        setValue(e.target.value)
                        props.setValue(e.target.value)
                      }}
                      selected={selected}
                    />
                  </>
              }

            </S.ContainerFormMedium>
            : <S.ContainerFormSmall>
              {
                type == 'select' ?
                  <Select options={options || []} selected={selected}
                    setSelected={setSelected} value={selected}
                    isMulti={isMulti}
                    isDisabled={readOnly}
                    placeholder={title}
                    styles={{ ...colourStyles, menuPortal: base => ({ ...base, zIndex: 99999999999 }) }}
                    menuPortalTarget={document.body}
                    menuPosition={'fixed'}
                    isClearable={isMulti && Array.isArray(value) ? value.some((v) => !v.isFixed) : ''}
                    onChange={(e) => {
                      if (isMulti) {
                        setSelected(e)
                        setValue(e)
                        props.setValue(e)
                        props.setSelected(e)
                      } else {
                        setSelected(e)
                        setValue(e)
                        props.setValue(e)
                        props.setSelected(e)
                      }

                    }} />
                  :
                  <>

                    <S.Space>
                      <S.Title>
                        {type == 'range' ? <>{title}:  {value}</> : <>{title}</>}
                      </S.Title>
                    </S.Space>
                    <S.Input
                      type={type}
                      readOnly={readOnly}
                      value={value}
                      placeholder={title}
                      min='10'
                      max='500'
                      step="1"
                      // style={getBackgroundSize()}
                      onChange={(e) => {
                        setValue(e.target.value)
                        props.setValue(e.target.value)
                      }}
                      selected={selected}
                    />
                  </>
              }

            </S.ContainerFormSmall>
      }

    </>

  )

}

export default InputFormFilter;
