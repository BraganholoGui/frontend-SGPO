import * as S from './style';
import DataTable from 'react-data-table-component';

function ListContent(props) {
  return (
      <S.ContainerMain>
        <S.Box>
          <DataTable
          data={props.data}
          columns={props.columns}
          pagination
          striped
          />
        </S.Box>
      </S.ContainerMain>
  )

}

export default ListContent;
