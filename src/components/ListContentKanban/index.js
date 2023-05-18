import * as S from './style';
import DataTable from 'react-data-table-component';
import { useState, useEffect, useMemo } from 'react';
import { Button } from 'reactstrap';
import Kanban from '../KanbanComponents/index';

function ListContentKanban(props) {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    console.log(props)
    setData(props.data);
  }, [props]);

  return (
    <S.ContainerMain>
      <S.Box>
        <Kanban data={data} setData={setData}/>
      </S.Box>
    </S.ContainerMain>
  )

}

export default ListContentKanban;
