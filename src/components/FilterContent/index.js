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
  const [fileName, setFileName] = useState(props.data);
  const [hover, setHover] = useState(false);
  const [hoverClean, setHoverClean] = useState(false);
  const [hoverDl, setHoverDl] = useState(false);


  useEffect(() => {
    setData(props.columnsExcel)
    setFileSheet(props.filesheet)
    setFileName(props.fileName)
  }, [props]);

  return (
    <S.ContainerMain>
      <S.Box spaceTitle={props.spaceTitle}>
        <S.FieldsContainer>
          {props.children}
        </S.FieldsContainer>
        <S.IconsContainer>
          <S.VerticalHr></S.VerticalHr>
          <S.FilterTitle onClick={props.loadData}  onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              >
            <FilterAlt />
            {hover && (
              <S.HoverText>
               Filtrar
              </S.HoverText>
            )}
          </S.FilterTitle>
          <S.VerticalHr></S.VerticalHr>
          <S.FilterTitle onClick={props.cleanFilter} onMouseEnter={() => setHoverClean(true)}
              onMouseLeave={() => setHoverClean(false)}>
            <FilterAltOff />
            {hoverClean && (
              <S.HoverText>
               Limpar filtros
              </S.HoverText>
            )}
          </S.FilterTitle>
          <S.VerticalHr></S.VerticalHr>
          <S.FilterTitle onClick={props.cleanFilter} onMouseEnter={() => setHoverDl(true)}
              onMouseLeave={() => setHoverDl(false)}>
            <S.ExportIcon onClick={() => { arrayToXLSX(data, filesheet, fileName) }} />
          {hoverDl && (
              <S.HoverText>
               Baixar relatório
              </S.HoverText>
            )}
          </S.FilterTitle>
        </S.IconsContainer>
      </S.Box>
    </S.ContainerMain>
  )

}

export default FilterContent;
