import * as S from './style';


function CBox(props) {

  return (
    <S.ContainerBox>
      <S.TitleBox>
        {props.title}
      </S.TitleBox>
      <S.Box quantityC={props.quantityContainer}>
        {props.children}
      </S.Box>
    </S.ContainerBox>
  )

}

export default CBox;
