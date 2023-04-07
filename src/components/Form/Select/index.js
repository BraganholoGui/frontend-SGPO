import { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select'

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
        }),
        // option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        //     const color = chroma(data.color);
        //     return {
        //         ...styles,
        //         backgroundColor: isDisabled
        //             ? undefined
        //             : isSelected
        //                 ? data.color
        //                 : isFocused
        //                     ? color.alpha(0.1).css()
        //                     : undefined,
        //         color: isDisabled
        //             ? '#ccc'
        //             : isSelected
        //                 ? chroma.contrast(color, 'white') > 2
        //                     ? 'white'
        //                     : 'black'
        //                 : data.color,
        //         cursor: isDisabled ? 'not-allowed' : 'default',

        //         ':active': {
        //             ...styles[':active'],
        //             backgroundColor: !isDisabled
        //                 ? isSelected
        //                     ? data.color
        //                     : color.alpha(0.3).css()
        //                 : undefined,
        //         },
        //     };
        // },
        // input: (styles) => ({ ...styles, ...dot() }),
        // placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
        // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    // &&:focus{
    //     border: 2px solid ${ theme.primaryDark };
    //     transition: all 0.9s ease -in -out;
    // }


    useEffect(() => {
        setOptions(props.options);
    }, [props])

    return (
        <Select styles={colourStyles} options={options} />
    )

}

export default SelectOptions;
