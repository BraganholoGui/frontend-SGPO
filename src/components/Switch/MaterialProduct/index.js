import { useEffect } from 'react';
import { useState } from 'react';
import * as S from './style';
import Select from 'react-select'
import { theme } from '../../../theme';
import Switch from "react-switch"

function SwitchMaterialProduct(props) {
    const [size, setSize] = useState('');
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [checked, setChecked] = useState(false);
    const [cleanValue, setCleanValue] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
        props.setChecked(!checked)
        props.setCleanValue(!null)
    }


    useEffect(() => {
        setSize(props.size);
        setTitle(props.title);
        setChecked(props.checked);
    }, [props])

    return (
        <>
            {
                size == 'small' ?
                    <S.ContainerFormSmall>
                        <S.Label>
                            <S.Span>Produto</S.Span>
                            <Switch
                                onChange={handleChange}
                                checked={checked}
                                onColor="#86d3ff"
                                onHandleColor="#2693e6"
                                offColor="#b6edc8"
                                offHandleColor="#115b4c"
                                handleDiameter={30}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                               
                            />
                            <S.Span>Material</S.Span>
                        </S.Label>
                    </S.ContainerFormSmall>
                    :
                    size == 'medium' ?
                        <S.ContainerFormMedium>
                            <S.Label>
                                <S.Span>Produto</S.Span>
                                <Switch
                                onChange={handleChange}
                                checked={checked}
                                onColor="#86d3ff"
                                onHandleColor="#2693e6"
                                offColor="#b6edc8"
                                offHandleColor="#115b4c"
                                handleDiameter={30}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                               
                            />
                                <S.Span>Material</S.Span>
                            </S.Label>


                        </S.ContainerFormMedium>
                        :
                        <S.ContainerFormBig>
                            <S.Label>
                                <S.Span>Produto</S.Span>
                                <Switch
                                onChange={handleChange}
                                checked={checked}
                                onColor="#86d3ff"
                                onHandleColor="#2693e6"
                                offColor="#b6edc8"
                                offHandleColor="#115b4c"
                                handleDiameter={30}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                               
                            />
                                <S.Span>Material</S.Span>
                            </S.Label>

                        </S.ContainerFormBig>
            }
        </>

    )

}

export default SwitchMaterialProduct;
