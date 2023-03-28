import * as S from './style';

function HeaderContent(props) {
  return (
      <S.ContainerMain>
        <S.Title id={props.id}>
          <S.Icon>
            {props.icon}
          </S.Icon>
          <S.TitleText>
            {props.title}
          </S.TitleText>
        </S.Title>
        {!props.id ? 
        <S.ButtonBox>
          <S.Button><a href={props.linkTo}>{props.titleButton}</a></S.Button>
        </S.ButtonBox>
        : null}
      </S.ContainerMain>
  )

}

export default HeaderContent;
