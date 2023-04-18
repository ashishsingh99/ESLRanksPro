import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const KeywordRanksChart = (props) => {
    const labels = props.labels;
    const dataSet = props.dataset;

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        interaction: { mode: 'index', intersect: false, },
        plugins: {
            legend: { position: 'top', display: false },
            title: { display: false, text: 'Chart.js Line Chart', }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: false
                }

            },
            y: {
                ticks: { stepSize: 10 },
                grid: { display: true }
            },
        }
    };

    const data = {
        labels,
        datasets: [
            {
                fill: false,
                label: props.Keyword,
                data: dataSet,
                borderColor: 'rgb(53, 162, 235)',
                tension: 0.1
            }
        ],
    };

    return (<div className='vertical-bar'><Line options={options} data={data} /></div>);

}

export default KeywordRanksChart;