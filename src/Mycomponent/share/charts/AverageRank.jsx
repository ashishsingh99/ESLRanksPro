import React, { useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, } from 'chart.js';
// import faker from 'faker';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);



const AverageChart = () => {
    const webURL = localStorage.getItem("websiteurl");
    const companyRankk = useRef(null);

    const AllPreviousData = useSelector(state => state.alloldkeyworddata);
    console.log('AllPreviousData', AllPreviousData)

    const searchCompany = useSelector(state => state.keyworddata);



    // getting all average rank data here ---
    // AllPreviousData && AllPreviousData.map(())


    searchCompany && searchCompany.filter((res) => {
        if (res.rank_group !== 'no rank') {
            companyRankk.current = companyRankk.current + res.rank_group
        }
    })

    const options = {
        // maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: false,
                // text: 'Chart.js Line Chart',
            },
        },
        scales: {
            y: {
                // max: Math.round(companyRankk.current / searchCompany.length * 2 / 5) * 5,
                max: Math.round(companyRankk.current / searchCompany.length) * 2,
                min: 0,
                ticks: {
                    stepSize: Math.round(companyRankk.current / searchCompany.length)
                }
            }
        }

    };

    const labels = ['', webURL, '']
    // const dataSet = [0, companyRankk.current / searchCompany.length, 100]
    const data = {
        labels,
        datasets: [
            {
                label: webURL,
                // data: [0, Math.round(companyRankk.current / searchCompany.length < 1 ? 1 : companyRankk.current / searchCompany.length)],
                data: [0, Math.round(companyRankk.current / searchCompany.length)],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                fill: true,
                tension: 0.2
            },
        ],
    };

    return (
        <div className='vertical-bar'><Line options={options} data={data} /></div>
    )

}

export default AverageChart;