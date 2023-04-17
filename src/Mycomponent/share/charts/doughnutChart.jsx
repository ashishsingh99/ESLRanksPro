import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartone = () => {
    const keywordData = useSelector(state => state.keyworddata);

    const [Top3, setTop3] = useState([]);
    const [Top10, setTop10] = useState([]);
    const [Top100, setTop100] = useState([]);
    const [NoRank, setNoRank] = useState([]);

    useEffect(() => {
        keywordData && keywordData.filter((res) => {
            if (res.rank_group === 'no rank') {
                // NoRank.current.push(res.rank_group)
                setNoRank((obj) => {
                    return [...obj, res.rank_group]
                })
                // console.log(NoRank.current)
            }
            else if (res.rank_group <= 3) {
                setTop3((obj) => {
                    return [...obj, res.rank_group]
                })
                // console.log('top 3', res.rank_group)
            }
            else if (res.rank_group > 3 && res.rank_group <= 10) {
                setTop10((obj) => {
                    return [...obj, res.rank_group]
                })

                // console.log('top 10 ', res.rank_group)
            }
            else if (res.rank_group > 10) {
                setTop100((obj) => {
                    return [...obj, res.rank_group]
                })
                // console.log('top 100 ', res.rank_group)
            }

        })
    }, [keywordData])



    const data = {
        labels: ['Top 3', 'Top 10', 'Top 100', 'No Rank'],
        datasets: [
            {
                label: 'No. of keywords',
                data: [Top3.length, Top10.length, Top100.length, NoRank.length],
                backgroundColor: [
                    'rgb(127,143,237)',
                    '#74d977',
                    'rgb(247,185,38)',
                    'rgb(255,143,132)'

                ],
                borderColor: [
                    'rgb(127,143,237)',
                    '#74d977',
                    'rgb(247,185,38)',
                    'rgb(255,143,132)',


                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
                position: 'right',

            }

        }
    }
    return (
        <div className='w-100'>
            <div className='row '>
                <div className='col-md-6 col-12'>
                    <div className='row'>
                        <div className='col-md-6 col-6'>
                            <div className='rank-chartd m-0'>
                                <h5> {Top3.length} </h5>
                                <p>Top 3</p>
                            </div>
                        </div>
                        <div className='col-md-6 col-6'>
                            <div className='rank-chartd m-0'>
                                <h5> {Top10.length} </h5>
                                <p>Top 10</p>

                            </div>
                        </div>
                        <div className='col-md-6 col-6'>
                            <div className='rank-chartd'>
                                <h5> {Top100.length} </h5>
                                <p>Top 100</p>
                            </div>
                        </div>
                        <div className='col-md-6 col-6'>
                            <div className='rank-chartd'>
                                <h5> {NoRank.length} </h5>
                                <p>No Ranking</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-md-6 col-12 '>
                    <div className='cmc'>
                        <div className='dough-one' style={{ padding: '15px' }} >
                            <Pie data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoughnutChartone;


