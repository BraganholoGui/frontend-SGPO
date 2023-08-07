import * as S from './style';


function CBox(props) {

  return (
      <S.Box quantityC={props.quantityContainer}>
        {props.children}
      </S.Box>
  )

}

export default CBox;
