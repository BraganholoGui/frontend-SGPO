import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import * as S from './style';

ChartJS.register(ArcElement, Tooltip, Legend);

export function CreatePieGraph(props) {
  const [labels, setLabel] = useState([]);
  const [datas, setDatas] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    setData({
      labels: labels,
      datasets: [
        {
          label: '# of Votes',
          data: datas,
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [props.labels, props.datasets, labels, datas])

  useEffect(() => {
    setLabel(props.labels);
    setDatas(props.datasets);

    setData({
      labels: props.labels,
      datasets: [
        {
          label: '# of Votes',
          data: props.datasets,
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [])

  return (
    <>
      {true && data ?
        <Pie data={data} />
        : null
      }
    </>
  )
}
