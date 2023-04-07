import * as S from './style';
import ReactLoading from "react-loading";

function Loading() {
  return (
    <ReactLoading
      type={"bars"}
      color={"#03fc4e"}
      height={100}
      width={100}
    />
  )

}

export default Loading;
