import * as S from './style';
import DataTable from 'react-data-table-component';
import { useState, useEffect, useMemo } from 'react';
import { Button } from 'reactstrap';
import SwitchMaterialProduct from '../Switch/MaterialProduct';
import { arrayToXLSX } from '../../GeneralFunctions/functions';

function FilterContent(props) {
  const [data, setData] = useState(props.data);
  const [filesheet, setFileSheet] = useState(props.data);
  const [fileName, zetFileName] = useState(props.data);


  useEffect(() => {
    setData(props.columnsExcel)
    setFileSheet(props.filesheet)
    zetFileName(props.fileName)
  }, [props]);

  return (
    <S.ContainerMain>
      <S.Box>
        <S.IconsContainer>
          <S.FilterTitle>
            Filtrar
          </S.FilterTitle>
          <S.VerticalHr></S.VerticalHr>
          <S.ExportIcon onClick={() => { arrayToXLSX(data, filesheet, fileName) }} />
        </S.IconsContainer>
      </S.Box>
    </S.ContainerMain>
  )

}

export default FilterContent;
