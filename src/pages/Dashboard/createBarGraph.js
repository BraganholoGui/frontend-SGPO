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
    indexAxis: 'y',
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
      },
      title: {
        display: false,
        text: 'Chart.js Horizontal Bar Chart',
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
          label: 'Dataset 1',
          data: labels.map((item, index) => props.datasets[index]),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          borderColor: 'rgb(53, 162, 235)',
        },
      ]
    });
  }, [labels])

  return (
    <>
      {data ?
        <Bar options={options} data={data} style={{maxWidth:'450px', maxHeight:'320px', minWidth:'450px', minHeight:'320px'}}  />
        : null
      }
    </>
  )
}
