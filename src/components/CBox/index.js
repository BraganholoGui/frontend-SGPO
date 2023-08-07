import * as S from './style';


function CBox(props) {

  return (
      <S.Box quantityC={props.quantity}>
        {props.children}
      </S.Box>
  )

}

export default CBox;
