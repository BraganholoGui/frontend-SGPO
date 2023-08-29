import * as S from './style';
import DataTable from 'react-data-table-component';
import { useState, useEffect, useMemo } from 'react';
import { Button } from 'reactstrap';
import SwitchMaterialProduct from '../Switch/MaterialProduct';
import { arrayToXLSX } from '../../GeneralFunctions/functions';
import { FilterAltOff, FilterAlt } from '@mui/icons-material';

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
      <S.Box spaceTitle={props.spaceTitle}>
        <S.FieldsContainer>
          {props.children}
        </S.FieldsContainer>
        <S.IconsContainer>
          <S.FilterTitle onClick={props.loadData}>
            Filtrar
            <FilterAlt />
          </S.FilterTitle>
          <S.VerticalHr></S.VerticalHr>
          <S.FilterTitle onClick={props.cleanFilter}>
            Limpar
            <FilterAltOff />
          </S.FilterTitle>
          <S.VerticalHr></S.VerticalHr>
          <S.FilterTitle onClick={props.cleanFilter}>
            <S.ExportIcon onClick={() => { arrayToXLSX(data, filesheet, fileName) }} />
          </S.FilterTitle>
        </S.IconsContainer>
      </S.Box>
    </S.ContainerMain>
  )

}

export default FilterContent;
