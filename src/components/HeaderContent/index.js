import Button from '../ButtonLink';
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
          <Button><a href={props.linkTo}>{props.titleButton}</a></Button>
        </S.ButtonBox>
      </S.ContainerMain>
  )

}

export default HeaderContent;
