import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, } from 'chart.js';
// import faker from 'faker';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);



const AverageChart = () => {
    const oldcompanyRankk = useRef(null);
    const oldAverageRank = useRef([])
    const [oldAverageLabel, setOldAverageLabel] = useState([])
    const AllPreviousData = useSelector(state => state.alloldkeyworddata);

    const webURL = localStorage.getItem("websiteurl");
    const [companyRankk, setCompanyRankk] = useState(0);
    const preCMRAnkk = useRef(0)

    const searchCompany = useSelector(state => state.keyworddata);

    useEffect(() => {
        searchCompany && searchCompany.filter((res) => {
            // console.log('res',res)
            if (res.rank_group !== 'no rank') {
                preCMRAnkk.current = preCMRAnkk.current + res.rank_group
                setCompanyRankk(preCMRAnkk.current)
            }
        })

        AllPreviousData && AllPreviousData.map((res) => {
            // console.log('AllPreviousData.res', res.data  )
            oldcompanyRankk.current = 0
            res.data && res.data.filter((res) => {
                if (res.rank_group !== 'no rank') {
                    oldcompanyRankk.current = oldcompanyRankk.current + res.rank_group
                }
            })
            oldAverageRank.current.push(oldcompanyRankk.current / res.data.length)

            // oldAverageLabel.current.push(res.date + ' ' + res.month)
            setOldAverageLabel((obj) => {
                return [...obj, res.date + ' ' + res.month]
            })
            // console.log('res.rank_group', oldAverageRank.current)

        })

    }, [AllPreviousData])


    const date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let day = date.getDate();
    let month = date.getMonth();
    const DDate = day + ' ' + monthNames[month]


    // if (oldAverageRank.current.length === AllPreviousData.length ) {
    //     oldAverageLabel.current.push('')
    //     oldAverageRank.current.push(companyRankk.current / searchCompany.length)
    // }




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
                // max: 50,
                // min: 0,
                ticks: {
                    stepSize: 2
                }
            }
        }

    };

    const labels = oldAverageLabel.concat(DDate)
    // const dataSet = [0, companyRankk.current / searchCompany.length, 100]
    const data = {
        labels,
        datasets: [
            {
                label: webURL,
                // data: [0, Math.round(companyRankk.current / searchCompany.length < 1 ? 1 : companyRankk.current / searchCompany.length)],
                data: oldAverageRank.current.concat(Number(companyRankk) / Number(searchCompany.length)),
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