import * as S from './style';
import ReactLoading from "react-loading";

export function Loading() {
  return (
    <ReactLoading
      type={"spin"}
      color={"#03fc4e"}
      height={70}
      width={70}
    />
  )

}
export function LoadingSmall() {
  return (
    <ReactLoading
      type={"spin"}
      color={"#03fc4e"}
      height={20}
      width={20}
    />
  )

}

