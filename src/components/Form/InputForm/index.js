import { useEffect } from 'react';
import { useState } from 'react';
import * as S from './style';
import Select from 'react-select'
import { theme } from '../../../theme';
import InputMask from 'react-input-mask';

function InputForm(props) {
  const [size, setSize] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [valueAux, setValueAux] = useState(0);
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isMulti, setIsMulti] = useState(false);

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      zIndex: 99999999,
      backgroundColor: 'white',
      //  background-color: ${(props) => (props.readOnly ? `${theme.inputLock}`: `${theme.input}`)};
      borderRadius: '10px',
      border: '2px solid #ccc',
      boxShadow: '2px 2px 3px #ccc',
      minHeight: '50px',
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
        border: `1px solid ${theme.inputLock}`,
        backgroundColor: `${theme.bgColor}`,
        borderRadius: '20px',
        padding: '5px',
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
        padding: '5px',
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
    setValueAux(maskCurrency(props.value ? props.value : 0));
  }, [props])

  function mascaraMoeda(event) {
    const onlyDigits = event.target.value
      .split("")
      .filter(s => /\d/.test(s))
      .join("")
      .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    setValue(digitsFloat)
    props.setValue(digitsFloat)
    event.target.value = maskCurrency(digitsFloat)
    setValueAux(maskCurrency(digitsFloat))
  }

  function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(valor)
  }

  const handleOptionChange = (event) => {
    setValue(event.target.value)
    props.setValue(event.target.value)
  };

  return (
    <>
      {
        size == 'small' ?
          <S.ContainerFormSmall>
            <S.Title>{title}</S.Title>
            {
              type == 'select' ?
                <Select options={options || []} selected={selected}
                  styles={{ ...colourStyles, menuPortal: base => ({ ...base, zIndex: 99999999999 }) }}
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  setSelected={setSelected} value={selected}
                  isMulti={isMulti}
                  isDisabled={readOnly}
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
                : type == 'phoneMask' ?
                  < InputMask
                    className="input-mask"
                    mask='(99) 99999-9999'
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value)
                      props.setValue(e.target.value)
                    }}>
                  </InputMask>
                  : type == 'cnpjMask' ?
                    < InputMask
                      className="input-mask"
                      mask='99.999.999/9999-99'
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value)
                        props.setValue(e.target.value)
                      }}>
                    </InputMask>
                    : type == 'priceMask' ?
                      <S.Input
                        type={type}
                        readOnly={readOnly}
                        value={valueAux}
                        onInput={(event) => mascaraMoeda(event)}
                        selected={selected}
                      />
                      : type == 'cpfMask' ?
                        < InputMask
                          className="input-mask"
                          mask='999.999.999-99'
                          value={value}
                          onChange={(e) => {
                            setValue(e.target.value)
                            props.setValue(e.target.value)
                          }}>
                        </InputMask>
                        : type == 'radio' ?
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="options"
                                value="option1"
                                checked={value === 'option1'}
                                onChange={handleOptionChange}
                              />
                              Sim
                            </label>

                            <label>
                              <input
                                type="radio"
                                name="options"
                                value="option2"
                                checked={value === 'option2'}
                                onChange={handleOptionChange}
                              />
                              Não
                            </label>
                          </div>
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

          </S.ContainerFormSmall >
          :
          size == 'medium' ?
            <S.ContainerFormMedium>
              <S.Title>{title}</S.Title>
              {
                type == 'select' ?
                  <Select options={options || []} selected={selected}
                  styles={{ ...colourStyles, menuPortal: base => ({ ...base, zIndex: 99999999999 }) }}
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  setSelected={setSelected} value={selected}
                  isMulti={isMulti}
                  isDisabled={readOnly}
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
                  : type == 'phoneMask' ?
                    <InputMask
                      className="input-mask"
                      mask='(99) 99999-9999'
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value)
                        props.setValue(e.target.value)
                      }}>
                    </InputMask>
                    : type == 'priceMask' ?
                      <S.Input
                        type={type}
                        readOnly={readOnly}
                        value={valueAux}
                        onInput={(event) => mascaraMoeda(event)}
                        selected={selected}
                      /> :
                      type == 'cnpjMask' ?
                        < InputMask
                          className="input-mask"
                          mask='99.999.999/9999-99'
                          value={value}
                          onChange={(e) => {
                            setValue(e.target.value)
                            props.setValue(e.target.value)
                          }}>
                        </InputMask>
                        : type == 'cpfMask' ?
                          < InputMask
                            className="input-mask"
                            mask='999.999.999-99'
                            value={value}
                            onChange={(e) => {
                              setValue(e.target.value)
                              props.setValue(e.target.value)
                            }}>
                          </InputMask>
                          : type == 'radio' ?
                            <div>
                              <label>
                                <input
                                  type="radio"
                                  name="options"
                                  value="option1"
                                  checked={value === 'option1'}
                                  onChange={handleOptionChange}
                                />
                                Sim
                              </label>

                              <label>
                                <input
                                  type="radio"
                                  name="options"
                                  value="option2"
                                  checked={value === 'option2'}
                                  onChange={handleOptionChange}
                                />
                                Não
                              </label>
                            </div>
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
                  <Select options={options || []} selected={selected}
                  styles={{ ...colourStyles, menuPortal: base => ({ ...base, zIndex: 99999999999 }) }}
                  menuPortalTarget={document.body}
                  menuPosition={'fixed'}
                  setSelected={setSelected} value={selected}
                  isMulti={isMulti}
                  isDisabled={readOnly}
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
                  : type == 'phoneMask' ?
                    <InputMask
                      className="input-mask"
                      mask='(99) 99999-9999'
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value)
                        props.setValue(e.target.value)
                      }}>
                    </InputMask> : type == 'cnpjMask' ?
                      < InputMask
                        className="input-mask"
                        mask='99.999.999/9999-99'
                        value={value}
                        onChange={(e) => {
                          setValue(e.target.value)
                          props.setValue(e.target.value)
                        }}>
                      </InputMask>
                      : type == 'priceMask' ?
                        <S.Input
                          type={type}
                          readOnly={readOnly}
                          value={valueAux}
                          onInput={(event) => mascaraMoeda(event)}
                          selected={selected}
                        />
                        : type == 'cpfMask' ?
                          < InputMask
                            className="input-mask"
                            mask='999.999.999-99'
                            value={value}
                            onChange={(e) => {
                              setValue(e.target.value)
                              props.setValue(e.target.value)
                            }}>
                          </InputMask>
                          : type == 'radio' ?
                            <div>
                              <label>
                                <input
                                  type="radio"
                                  name="options"
                                  value="option1"
                                  checked={value === 'option1'}
                                  onChange={handleOptionChange}
                                />
                                Sim
                              </label>

                              <label>
                                <input
                                  type="radio"
                                  name="options"
                                  value="option2"
                                  checked={value === 'option2'}
                                  onChange={handleOptionChange}
                                />
                                Não
                              </label>
                            </div>
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
            </S.ContainerFormBig>

      }
    </>

  )

}

export default InputForm;
