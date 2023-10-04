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

  useEffect(() => {
    setLabels(props.labels);
  }, [])
  useEffect(() => {
    setLabels(props.labels);
  }, [props])

  useEffect(() => {

    setData({
      labels,
      datasets: [
        {
          label: 'Qtd',
          data: labels.map((item, index) => props.datasets[index]),
          backgroundColor: ['#a47130',
          '#d3b837',],
          borderColor: ['#d3b837',
          '#fff',],
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
