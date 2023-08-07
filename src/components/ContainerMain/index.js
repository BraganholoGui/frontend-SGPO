import * as S from './style';
import DataTable from 'react-data-table-component';
import { useState, useEffect, useMemo } from 'react';
import { Button } from 'reactstrap';
import SwitchMaterialProduct from '../Switch/MaterialProduct';
import CreateGraph from '../../pages/Dashboard/createGraph';
import CBox from '../CBox';
import Container from '../Container';

function ContainerMain(props) {

  //   const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;

  //   const actionsMemo = useMemo(() => <Export onExport={() => downloadCSV(data)} />, []);

  // function convertArrayOfObjectsToCSV(array) {
  // 	let result;

  // const columnDelimiter = ',';
  // 	const lineDelimiter = '\n';
  // const keys = Object.keys(data[0]);

  // 	result = '';
  // 	result += keys.join(columnDelimiter);
  // 	result += lineDelimiter;

  // 	array.forEach(item => {
  // 		let ctr = 0;
  // 		keys.forEach(key => {
  // 			if (ctr > 0) result += columnDelimiter;

  // 			result += item[key];

  // 			ctr++;
  // 		});
  // 		result += lineDelimiter;
  // 	});

  // 	return result;
  // }
  //   function downloadCSV(array) {
  //       const link = document.createElement('a');
  //     let csv = convertArrayOfObjectsToCSV(array);
  //     if (csv == null) return;

  //     const filename = 'export.csv';

  //     if (!csv.match(/^data:text\/csv/i)) {
  //       csv = `data:text/csv;charset=utf-8,${csv}`;
  //     }
  //     link.setAttribute('href', encodeURI(csv));
  //     link.setAttribute('download', filename);
  //     link.click();
  //   }
  return (
    <S.ContainerMain>
      {props.children}
    </S.ContainerMain>
  )

}

export default ContainerMain;
