import * as S from './style';

function GeneralContent(props) {
    return (
        <S.Content>
            {props.children}
        </S.Content>
    )

}

export default GeneralContent;
