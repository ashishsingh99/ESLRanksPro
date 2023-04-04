import React from 'react';
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
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const VerticalBar = () => {
    const options = {
        responsive: true,
        scales: {
            y: {

                beginAtZero: true,
                ticks: {
                    stepSize: true,
                    color: 'black'
                },
                grid: {
                    display: true,
                    lineWidth: 2
                },
            },
            x: {
                grid: {
                    display: false,
                    // lineWidth: 1
                },
                ticks: {
                    // stepSize:6,
                    color: ['blue', 'red'],
                    fontSize: 10
                },
            },

        },
        plugins: {
            legend: {
                position: 'top',
                display: true
            },
            title: {
                display: true,
                // text: 'Search Volume',
            },
        },
    };

    const labels = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',

                data: labels.map(() => faker.datatype.number({ min: 0, max: 5 })),
                backgroundColor: 'rgb(69,81,151)',
            },
            {
                label: 'Dataset 2',
                data: labels.map(() => faker.datatype.number({ min: 1, max: 3 })),
                backgroundColor: 'rgb(255,99,132)',
            },
        ],
    };

    return (
        <div className='vertical-bar'>
                <Bar options={options} data={data} />
        </div>
    )
}

export default VerticalBar;


