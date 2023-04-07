import { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select'
import { theme } from '../../../theme';

function SelectOptions(props) {
    const [options, setOptions] = useState([]);
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
        // input: (styles) => ({ ...styles, ...dot() }),
        // placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
        // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    useEffect(() => {
        setOptions(props.options);
    }, [props])

    return (
        <Select styles={colourStyles} options={options} />
    )

}

export default SelectOptions;
