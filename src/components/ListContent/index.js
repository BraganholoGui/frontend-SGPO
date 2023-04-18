import * as S from './style';
import DataTable from 'react-data-table-component';
import { useState, useEffect, useMemo } from 'react';
import { Button } from 'reactstrap';

function ListContent(props) {
  const [data, setData] = useState(props.data);
  const [columns, setColumns] = useState(props.columns);

  useEffect(() => {
    setData(props.data);
    setColumns(props.columns);
  }, [props.data, props.columns]);

  const customStyles = {
    all:{
      borderRadius: '20px',
    },
    table: {
      style: {
        borderTop: '2px solid rgb(	17, 91, 76, 0.3)',
        borderLeft: '2px solid rgb(	17, 91, 76, 0.3)',
        borderRight: '2px solid rgb(	17, 91, 76, 0.5)',
        borderBottom: '2px solid rgb(	17, 91, 76, 0.5)',
        borderRadius: '20px',
      },
    },
    rows: {
      style: {
        borderRadius: '20px',
      },
    },
    headRow: {
      style: {
        borderRadius: '20px',
        borderBottom: '2px solid rgb(	17, 91, 76, 0.5)',
      },
    },
    headCells: {
      style: {
        borderRadius: '20px',
        borderRight: '2px solid rgb(	17, 91, 76, 0.5)',
        fontWeight:700,
        fontSize:'15px'
      },
    },
    noData: {
      style: {
        borderRadius: '20px',
        padding:'24px'
      },
    },
    cells: {
      style: {
        borderRadius: '20px',
        borderRight: '2px solid rgb(	17, 91, 76, 0.3)',
        borderBottom: '2px solid rgb(	17, 91, 76, 0.3)',
        flexWrap:"wrap"
        
      },
    },
  };
  const paginationComponentOptions = {
    rowsPerPageText: 'Linhas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};
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
      <S.Box>
        <DataTable
          data={data}
          columns={columns}
        // actions={actionsMemo}
          customStyles={customStyles}
          subHeaderAlign={'left'}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          noDataComponent={"Não há cadastros!"}
          striped
        />
      </S.Box>
    </S.ContainerMain>
  )

}

export default ListContent;
