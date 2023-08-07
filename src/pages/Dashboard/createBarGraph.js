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
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  console.log(props)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  
  useEffect(() => {
    setLabels(props.labels);
    setData({
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: props.labels.map(() => 10),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: props.labels.map(() => 10),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ]
    });
  }, [props])



  return <Bar options={options} data={data} />;
}
