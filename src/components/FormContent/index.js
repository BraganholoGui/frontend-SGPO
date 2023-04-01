import * as S from './style';
import { useState, useEffect } from 'react';

function FormContent(props) {
  const [data, setData] = useState(props.data);
  const [columns, setColumns] = useState(props.columns);

  useEffect(() => {
    setData(props.data);
    setColumns(props.columns);
  }, [props.data, props.columns]);


  return (
    <S.ContainerMain>
      <S.Box>
        {props.children}
      </S.Box>
    </S.ContainerMain>
  )

}

export default FormContent;
