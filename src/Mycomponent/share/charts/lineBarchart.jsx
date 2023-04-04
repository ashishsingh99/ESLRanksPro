import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const LineChart = () => {
    const websiteurl = localStorage.getItem('websiteurl')
    const keywordData = useSelector(state => state.keyworddata);
    const Keyword = useSelector(state => state.userallkeywordresult);

    const [companyRank, setCompanyRank] = useState([0])
    const [companyName, setCompanyName] = useState([''])

    useEffect(() => {

        keywordData && keywordData.filter((cDeatils) => {
            if (cDeatils.rank_group !== 'no rank') {
                setCompanyRank(obj => {
                    return [...obj, cDeatils.rank_group]
                })

            }
            else {
                setCompanyRank(obj => {
                    return [...obj, 0]
                })

            }
        })

        Keyword && Keyword.map(keyw => {
            // console.log('keyw', keyw)
            setCompanyName(obj => {
                return [...obj, keyw.keyword]
            })
        })

    }, [keywordData]);

    const labels = companyName.concat('top 100');
    const dataSet = companyRank.concat(100);

    const options = {
        // maintainAspectRatio: false,
        responsive: true,
        interaction: { mode: 'index', intersect: false, },
        plugins: {
            legend: { position: 'top', display: false },
            title: { display: false, text: 'Chart.js Line Chart', }
        },
    };

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: websiteurl,
                data: dataSet,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.2
            }
        ],
    };

    return (<div className='vertical-bar'><Line options={options} data={data} /></div>);

}

export default LineChart;