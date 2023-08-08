import * as S from './style';
import DataTable from 'react-data-table-component';
import { useState, useEffect, useMemo } from 'react';
import { Button } from 'reactstrap';
import SwitchMaterialProduct from '../Switch/MaterialProduct';
import CreateGraph from '../../pages/Dashboard/createGraph';

function Container(props) {
 
  return (
    <S.Content heigtLimit={props.heigtLimit}>
      {props.children}
    </S.Content>
  )

}

export default Container;
