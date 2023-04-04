import React, { useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartone = () => {
    const keywordData = useSelector(state => state.keyworddata);

    const Top3 = useRef([]);
    const Top10 = useRef([]);
    const Top100 = useRef([]);
    const NoRank = useRef([]);

    keywordData && keywordData.filter((res) => {
        if (res.rank_group === 'no rank') {
            NoRank.current.push(res.rank_group)
        }
        else if (res.rank_group <= 3) {
            Top3.current.push(res.rank_group)
            // console.log('top 3', res.rank_group)
        }
        else if (res.rank_group > 3 && res.rank_group <= 10) {
            Top10.current.push(res.rank_group)

            // console.log('top 10 ', res.rank_group)
        }
        else if (res.rank_group > 10) {
            Top100.current.push(res.rank_group)
            // console.log('top 100 ', res.rank_group)
        }

    })

    const data = {
        labels: ['Top 3', 'Top 10', 'Top 100', 'No Rank'],
        datasets: [
            {
                label: 'No. of keywords',
                data: [Top3.current.length, Top10.current.length, Top100.current.length, NoRank.current.length],
                backgroundColor: [
                    'rgb(127,143,237)',
                    'rgb(255,99,132)',
                    'rgb(247,185,38)',
                    'rgb(255,143,132)'

                ],
                borderColor: [
                    'rgb(127,143,237)',
                    'rgb(255,99,132)',
                    'rgb(247,185,38)',
                    'rgb(127,143,237)',


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
                                <h5> {Top3.current.length} </h5>
                                <p>Top 3</p>
                            </div>
                        </div>
                        <div className='col-md-6 col-6'>
                            <div className='rank-chartd m-0'>
                                <h5> {Top10.current.length} </h5>
                                <p>Top 10</p>

                            </div>
                        </div>
                        <div className='col-md-6 col-6'>
                            <div className='rank-chartd'>
                                <h5> {Top100.current.length} </h5>
                                <p>Top 100</p>
                            </div>
                        </div>
                        <div className='col-md-6 col-6'>
                            <div className='rank-chartd'>
                                <h5> {NoRank.current.length} </h5>
                                <p>No Ranking</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-md-6 col-12 '>
                    <div className='cmc'>
                        <div className='dough-one' style={{ padding: '15px' }} >
                            <Doughnut data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoughnutChartone;


