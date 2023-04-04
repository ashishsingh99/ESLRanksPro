import React, { useState } from 'react'
import PlLogin from './login/plLogin'
import '../css/upgrade.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRef } from 'react';
const Upgrade = () => {
    const [show, setShow] = useState(false);
    const [planType, setplanType] = useState('month')
    const plansDetails = useSelector(state => state.plansdetails)
    const [filteredPlansShow, setFilteredPlansShow] = useState([]);
    const showDetails = () => {
        if (show === false) {
            setShow(true)
        }
        else {
            setShow(false)
        }
    }
    const ChangeMonthType = () => {
        setplanType('month')

    }
    const ChangeAnnualType = () => {
        setplanType('yearly')
    }

    useEffect(() => {
        // filteredPlansShow.current = []
        setFilteredPlansShow([]);
        plansDetails && plansDetails.filter((plan) => {
            if (planType === plan.validity) {
                // filteredPlansShow.current.push(plan)
                setFilteredPlansShow(res => {
                    return [...res, plan]
                })
                // console.log('plantype based details', filteredPlansShow.current)
                // console.log('plantype based details', filteredPlansShow)

            }
        })
    }, [plansDetails, planType])

    const loginOut = localStorage.getItem('loginOut')
    if (loginOut === 'true') {
        return (
            <>
                <div className='cmd-b'>
                    <div className='w-100'>
                        <div className="cmc mb-3">
                            <div>
                                <button
                                    style={{ borderRadius: "0px" }}
                                    className={planType === "month" ? "cm-btn" : "cm-btn-b"}
                                    onClick={ChangeMonthType}
                                >
                                    <div className="btn-hov">Month </div>
                                </button>
                                <button
                                    style={{ borderRadius: "0px" }}
                                    className={planType === "yearly" ? "cm-btn" : "cm-btn-b"}
                                    onClick={ChangeAnnualType}
                                >

                                    <div className="btn-hov">Annualy </div>
                                </button>
                            </div>
                            <div></div>
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <div className='upgrade-card '>
                                    <h3 style={{ textTransform: "capitalize" }}>{filteredPlansShow.length !== 0 ? filteredPlansShow[1].name : ''}</h3>
                                    <p>{filteredPlansShow.length !== 0 ? filteredPlansShow[1].proj_len : ''}-websites </p>
                                    <h4>${filteredPlansShow.length !== 0 ? filteredPlansShow[1].price : ''}</h4>
                                    <p className='usd-p'>USD/month</p>
                                    <div className='up-cont'>
                                        <ul>
                                            <li> <i className="fa-solid fa-check"></i> 300 searches / day</li>
                                            <li> <i className="fa-solid fa-check"></i> 7 domains</li>
                                            <li> <i className="fa-solid fa-check"></i> {filteredPlansShow.length !== 0 ? filteredPlansShow[1].keyword_len : ''} tracked keywords / domain</li>
                                            <li> <i className="fa-solid fa-check"></i> 10 competitors / domain</li>
                                            <li> <i className="fa-solid fa-check"></i> 5,000 page scans / domain</li>
                                            <li> <i className="fa-solid fa-check"></i> 2 users</li>
                                            <li className='see_more' onClick={showDetails}>See More</li>
                                        </ul>
                                        <a href={filteredPlansShow.length !== 0 ? filteredPlansShow[1].payment_link : null}>   <button className='upgrade-button' >Start Free Trial</button> </a>
                                    </div>
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className='upgrade-card up-ca-active'>
                                    <h3 style={{ textTransform: "capitalize" }}>{filteredPlansShow.length !== 0 ? filteredPlansShow[0].name : ''}</h3>
                                    <p>{filteredPlansShow.length !== 0 ? filteredPlansShow[0].proj_len : ''}-websites </p>
                                    <h4>${filteredPlansShow.length !== 0 ? filteredPlansShow[0].price : ''}</h4>
                                    <p className='usd-p'>USD/month</p>
                                    <div className='up-cont'>
                                        <ul>
                                            <li> <i className="fa-solid fa-check"></i> 150 searches / day</li>
                                            <li> <i className="fa-solid fa-check"></i> 1 domains</li>
                                            <li> <i className="fa-solid fa-check"></i> {filteredPlansShow.length !== 0 ? filteredPlansShow[0].keyword_len : ''} tracked keywords / domain</li>
                                            <li> <i className="fa-solid fa-check"></i> 5 competitors / domain</li>
                                            <li> <i className="fa-solid fa-check"></i> 1,000 page scans / domain</li>
                                            <li> <i className="fa-solid fa-check"></i> 1 users</li>
                                            <li className='see_more' onClick={showDetails}>See More</li>

                                        </ul>
                                        <a href={filteredPlansShow.length !== 0 ? filteredPlansShow[0].payment_link : null}>    <button className='upgrade-button' >Start Free Trial</button></a>
                                    </div>
                                </div>
                            </div>

                            <div className='col-4'>
                                <div className='upgrade-card '>
                                    <h3 style={{ textTransform: "capitalize" }}>{filteredPlansShow.length !== 0 ? filteredPlansShow[2].name : ''}</h3>
                                    <p>{filteredPlansShow.length !== 0 ? filteredPlansShow[2].proj_len : ''}-websites </p>
                                    <h4>${filteredPlansShow.length !== 0 ? filteredPlansShow[2].price : ''}</h4>
                                    <p className='usd-p'>USD/month</p>
                                    <div className='up-cont'>
                                        <ul>
                                            <li> <i className="fa-solid fa-check"></i> 900 searches / day</li>
                                            <li> <i className="fa-solid fa-check"></i> 15 domains</li>
                                            <li> <i className="fa-solid fa-check"></i> {filteredPlansShow.length !== 0 ? filteredPlansShow[2].keyword_len : ''} tracked keywords / domain</li>
                                            <li> <i className="fa-solid fa-check"></i> 15 competitors / domain</li>
                                            <li> <i className="fa-solid fa-check"></i> 10,000 page scans / domain</li>
                                            <li> <i className="fa-solid fa-check"></i> 5 users</li>
                                            <li className='see_more' onClick={showDetails}>See More</li>

                                        </ul>
                                        <a href={filteredPlansShow.length !== 0 ? filteredPlansShow[2].payment_link : null}>      <button className='upgrade-button' >Start Free Trial</button> </a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                {
                    show ?

                        <div className='cmd-b'>
                            <div className='table-planpr w-100'>
                                <table className=''>
                                    <tr >
                                        <th>SEO Training & Support</th>
                                        <td className='ty-tr'>Business</td>
                                        <td className='ty-tr'>Individual</td>
                                        <td className='ty-tr'>enterprise</td>
                                    </tr>
                                    <tr >

                                        <td>Step by Step SEO Training Course</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                    </tr>
                                    <tr >
                                        <td>Templates & Worksheets</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                    </tr>
                                    <tr >
                                        <td>Biweekly Coaching and Q&A Call</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                    </tr>
                                    <tr >
                                        <td>Email Support</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                    </tr>
                                </table>

                                <table className=''>
                                    <tr >
                                        <th>Reports Per Day</th>
                                        <td>150</td>
                                        <td>300</td>
                                        <td>900</td>
                                    </tr>
                                    <tr >
                                        <th>Projects</th>
                                        <td>1</td>
                                        <td>8</td>
                                        <td>15</td>
                                    </tr>
                                    <tr >
                                        <th>Chrome Extension Search Limits</th>
                                        <td>100</td>
                                        <td>300</td>
                                        <td>900</td>
                                    </tr>

                                </table>

                                <table className=''>
                                    <tr >
                                        <th>Rank Tracking</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr >

                                        <td>Tracked Keywords</td>
                                        <td>125 per project</td>
                                        <td>150 per project</td>
                                        <td>200 per project</td>
                                    </tr>
                                    <tr >
                                        <td>Update Frequency</td>
                                        <td>Daily</td>
                                        <td>Daily</td>
                                        <td>Daily</td>
                                    </tr>
                                    <tr >
                                        <td>Mobile Rank Tracking</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                    </tr>
                                    <tr >
                                        <td>Numbers of locations</td>
                                        <td>20</td>
                                        <td>Unlimited</td>
                                        <td>Unlimited</td>
                                    </tr>
                                    <tr >
                                        <td>Data reporting</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                    </tr>
                                </table>

                                <table className=''>
                                    <tr >
                                        <th>Site Audit</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr >

                                        <td>Pages crawled per report</td>
                                        <td>1000</td>
                                        <td>5000</td>
                                        <td>10000</td>
                                    </tr>
                                    <tr >
                                        <td>Crawling Frequency</td>
                                        <td>Weekly</td>
                                        <td>Weekly</td>
                                        <td>Weekly</td>
                                    </tr>

                                </table>

                                <table className=''>
                                    <tr >
                                        <th>Keyword Research</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr >

                                        <td>Historical Data</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                    </tr>
                                    <tr >
                                        <td>Keyword Suggestions</td>
                                        <td>20,000</td>
                                        <td>20,000</td>
                                        <td>20,000</td>
                                    </tr>
                                    <tr >
                                        <td>Content Ideas</td>
                                        <td>2000</td>
                                        <td>2000</td>
                                        <td>2000</td>
                                    </tr>
                                    <tr >
                                        <td>Data exporting per report</td>
                                        <td>2000 rows</td>
                                        <td>2000 rows</td>
                                        <td>2000 rows</td>
                                    </tr>
                                    <tr >
                                        <td>Filtering</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                        <td>&#10004;</td>
                                    </tr>
                                </table>




                            </div>
                        </div> : ''
                }
            </>
        )
    }
    else {
        return <PlLogin />
    }
}

export default Upgrade;