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
                    </S.ContainerFormSmall>
                    :
                    size == 'medium' ?
                        <S.ContainerFormMedium>
                            <S.Title>{title}</S.Title>
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
                        </S.ContainerFormMedium>
                        :
                        <S.ContainerFormBig>
                            <S.Title>{title}</S.Title>
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
                        </S.ContainerFormBig>
            }
        </>

    )

}

export default InputForm;
