import * as S from './style';
import DataTable from 'react-data-table-component';
import { useState, useEffect, useMemo } from 'react';
import { Button } from 'reactstrap';

function ListContentKanban(props) {
  const [data, setData] = useState(props.data);
  const [columns, setColumns] = useState(props.columns);
  const [conditionalRowStyles, setConditionalRowStyles] = useState(props.conditionalRowStyles);

  useEffect(() => {
    setData(props.data);
    setColumns(props.columns);
    setConditionalRowStyles(props.conditionalRowStyles);
  }, [props.data, props.columns]);

  return (
    <S.ContainerMain>
      <S.Box>
        
      </S.Box>
    </S.ContainerMain>
  )

}

export default ListContentKanban;
