import * as S from './style';

function GeneralContent(props) {
    console.log(props)
    return (
        <S.Content>
            {props.children}
        </S.Content>
    )

}

export default GeneralContent;
