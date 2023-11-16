import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function CreateBarGraph(props) {
  const [labels, setLabels] = useState(props.labels);
  const [data, setData] = useState(null);
  const options = {
    // indexAxis: 'y',
    elements: {
      bar: {
        display: false,
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'right',
        labels: {
          color: '#d3b837', 
        },
      },
      title: {
        display: false,
      },
    },
  };

  // useEffect(() => {
  //   setLabels(props.labels);
  // }, [])
  useEffect(() => {
    let labelsAux=[];
    props.labels.map((label, index) => {
      if(index<8) labelsAux.push(label);
    })
    setLabels(labelsAux);
  }, [props])

  useEffect(() => {
    let labelsAux =[];
    let datasetsAux=[];
    props.datasets.map((dataset, index) => {
      if(index<8) datasetsAux.push(dataset);
    })
    // labels.map((label, index) => {
    //   if(index<1) labelsAux.push(label);
    // })
    setData({
      labels,
      datasets: [
        {
          label: 'Qtd',
          data: labels?.map((item, index) => datasetsAux[index]),
          backgroundColor: ['#042A2B','#2f5449','#4b7468', '#4c8977','#4ea289','#78aa9c', '#93b9ae', '#b6e5d2'
          ],
          borderColor: ['#fff',
          ],
          borderRadius:'20px',
          maxHeight: '10px',
          height: '10px',
        },
      ]
    });
  }, [labels])

  return (
    <>
      {data ?
        <Bar options={options} data={data} style={{ maxWidth: '450px', maxHeight: '320px', minWidth: '100px', minHeight: '320px' }} />
        : null
      }
    </>
  )
}
