import * as S from './style';

function HeaderContent(props) {
  return (
      <S.ContainerMain>
        <S.Title>
          <S.Icon>
            {props.icon}
          </S.Icon>
          <S.TitleText>
            {props.title}
          </S.TitleText>
        </S.Title>
        <S.ButtonBox>
          <S.Button>Novo Usuário</S.Button>
        </S.ButtonBox>
      </S.ContainerMain>
  )

}

export default HeaderContent;
