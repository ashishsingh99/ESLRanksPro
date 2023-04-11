import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ADMIN_USERS, get_Plans_Details } from '../../services/constants'
import { useSelector } from 'react-redux'
import analyze from '../../Mycomponent/Assets/analyze.png'

const Dashboard = () => {
    const [users, setUsers] = useState(0)
    const [keywords, setKeywords] = useState(0)
    const [planDetails, setPlanDetails] = useState(0)
    const allprojectdata = useSelector((state) => state.allprojectdata);
    useEffect(() => {
        axios.get(ADMIN_USERS())
            .then((res) => {
                const data = res.data
                console.log('adminUser', res.data)
                setUsers(data.length)
                setKeywords(allprojectdata.length)

            })
        axios.get(get_Plans_Details())
            .then((res) => {
                // console.log('res get', res.data.data)
                setPlanDetails(res.data.data.length)
            })
    })

    return (
        <div>
            <div>
                <h2 className='table_title mb-4'>Dashboard</h2>
                <div>
                    <div className='row'>
                        <div className='col-md-3'>
                            <div className="Card">
                                <div>
                                    <h3>{users}</h3>
                                    <h5> Users</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="Card">
                                <div>
                                    <h3>0</h3>
                                    <h5> Subscribed Users</h5>
                                </div>

                            </div>
                        </div>
                        {/* <div className='col-md-3'>
                            <div className="Card">
                                <h3>0</h3>
                                <h5>Subscription Selling Most</h5>
                            </div>
                        </div> */}
                        <div className='col-md-3'>
                            <div className="Card">
                                <div>
                                    <h3>{keywords}</h3>
                                    <h5> Keywords</h5>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="Card">
                                <div>
                                    <h3>{planDetails}</h3>
                                    <h5> Active Plans</h5>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <div className='hm-analyze d-md-flex d-none'>
                    <div className='hm-ana-img'><img src={analyze} alt="analyze img" /></div>
                    <div className='hm-an-con'>
                        <h3>
                            Analyze your competitors SEO and get new opportinities to increase SEO Score
                        </h3>
                    </div>
                    <div className='hm-an-cm'>
                        <p>Analyze competitors -</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Dashboard;