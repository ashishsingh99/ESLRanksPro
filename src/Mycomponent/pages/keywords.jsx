import React, { useEffect } from 'react'
import Loader from '../share/loader';
import { CSVLink } from 'react-csv';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import UnderConstruction from './login/underConstruction';

const Keywords = () => {
    const AllprDta = useSelector(state => state.allprdata);
    const AllOrganic = useSelector(state => state.organic);



    // useState for saving credentials
    const [detailsCSV, setDetailsCSV] = useState('')
    const [lastIndex, setLastIndex] = useState('');
    const [postPerPage, setPostPerPage] = useState(5);
    const [firstPageIndex, setFirstPageIndex] = useState(1);
    const [lastPageIndex, setLastPageIndex] = useState();
    const [startData, setStartData] = useState(0);
    const [endData, setEndData] = useState(5);



    useEffect(() => {


        AllprDta && AllprDta.map((allpr) => {
            return allpr.data.tasks && allpr.data.tasks.map((res) => {
                return res.result && res.result.map((res) => {
                    setDetailsCSV(res.items);
                    // lastIndex number of table
                    setLastIndex(res.items.length);
                    const totalArrayLength = res.items.length / postPerPage;
                    const totalRows = Math.ceil(totalArrayLength);
                    setLastPageIndex(totalRows);
                    setFirstPageIndex(Math.ceil(endData / postPerPage));

                })
            })
        })
    }, [AllprDta, endData, postPerPage,]);



    // table pre page
    const getPrevPage = () => {
        if (firstPageIndex === 1) {
            return false
        }
        else {
            setStartData(startData - postPerPage);
            setEndData(endData - parseInt(postPerPage));
        }

    }

    // table next page
    const getNextPage = () => {
        if (lastPageIndex === firstPageIndex) {
            return false
        }
        else {
            setStartData(endData);
            setEndData(endData + parseInt(postPerPage));
        }
    }

    // table All page Data
    const AllKeywords = () => {
        setStartData(startData);
        setEndData(lastIndex);
    }

    // table post per page function
    const PerPageChange = (e) => {
        const SSdata = e.target.value;
        setPostPerPage(e.target.value)
        setStartData(0);
        setEndData(parseInt(SSdata));

    }

    return (
        // <UnderConstruction />
        <div>
            <div className='cmd-b'>
                <div className=''>
                    <select className='hm-b1-select'>
                        <option>
                            Add Project
                        </option>
                    </select>
                    <button className='cm-btn'>    +  Add Project  </button>
                </div>
                <div className='hm-b1-inp'>
                    <div className='hm-b1-i'>
                        <i className="fa fa-search"></i>
                    </div>
                    <input type='text' placeholder='Search Project'></input>
                </div>
            </div>
            <div className='cmd-b'>
                <div className='d-block w-100'>
                    <div>
                        <div className='hm-b-ta mt-0'>
                            <div className='cmd mb-3'>
                                <div> Content Ideas </div><button className="cm-btn"> Export to CSV</button>
                            </div>
                            <table className="table" style={{ borderBottom: "none !important" }}>
                                <thead style={{ borderBottom: "none !important" }}>
                                    <tr style={{ borderBottom: "none !important" }} >
                                        <th scope="col" style={{ borderBottom: "none !important" }}>Page Title Url</th>
                                        <th scope="col">EST.Visits</th>
                                        <th scope="col">Backlinks</th>
                                    </tr>
                                </thead>
                                <tbody style={{ borderTop: "none !important" }}>
                                    <tr style={{ borderTop: "none !important" }}>

                                        <td> <div className='con-ideas'>Using uk Three mobile phone in vegas  - Las Vegas Message ... <p>tripadvisor.co.uk</p> </div> </td>
                                        <td><select><option>0 keywords</option></select></td>
                                        <td><select><option>0 Links</option></select></td>

                                    </tr>
                                    <tr>

                                        <td> <div className='con-ideas'>Using uk Three mobile phone in vegas  - Las Vegas Message ... <p>tripadvisor.co.uk</p> </div> </td>
                                        <td><select><option>0 keywords</option></select></td>
                                        <td><select><option>0 Links</option></select></td>
                                    </tr>
                                    <tr>

                                        <td> <div className='con-ideas'>Using uk Three mobile phone in vegas  - Las Vegas Message ... <p>tripadvisor.co.uk</p> </div> </td>
                                        <td><select><option>0 keywords</option></select></td>
                                        <td><select><option>0 Links</option></select></td>
                                    </tr>

                                    <tr>

                                        <td> <div className='con-ideas'>Using uk Three mobile phone in vegas  - Las Vegas Message ... <p>tripadvisor.co.uk</p> </div> </td>
                                        <td><select><option>0 keywords</option></select></td>
                                        <td><select><option>0 Links</option></select></td>
                                    </tr>

                                    <tr>
                                        <td> <div className='con-ideas'>Using uk Three mobile phone in vegas  - Las Vegas Message ... <p>tripadvisor.co.uk</p> </div> </td>
                                        <td><select><option>0 keywords</option></select></td>
                                        <td><select><option>0 Links</option></select></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <div className='hm-b-ta'>

                            <table className="table" style={{ borderBottom: "none !important" }}>
                                <thead style={{ borderBottom: "none !important" }}>
                                    <tr style={{ borderBottom: "none !important" }} >
                                        <th scope="col" style={{ borderBottom: "none !important" }}>KEYWORD</th>
                                        <th scope="col">VOLUME</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Esit.Visit</th>
                                        <th scope='col'>CPC</th>
                                        <th scope="col">PD</th>
                                        <th scope="col">SD</th>

                                    </tr>
                                </thead>
                                <tbody style={{ borderTop: "none !important" }}>
                                    <tr style={{ borderTop: "none !important" }}>
                                        <td>star wars ringtones</td>
                                        <td>260</td>
                                        <td>6</td>
                                        <td>4</td>
                                        <td>₹0</td>
                                        <td>1</td>
                                        <td>51</td>

                                    </tr>

                                    <tr style={{ borderTop: "none !important" }}>
                                        <td>star wars ringtones</td>
                                        <td>260</td>
                                        <td>6</td>
                                        <td>4</td>
                                        <td>₹0</td>
                                        <td>1</td>
                                        <td>51</td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <button className='cm-btn-b'>EXPORT TO CSV</button>
                        <table className='table mt-3'>
                            <tbody style={{ borderTop: "none !important" }}>
                                <tr style={{ borderTop: "none !important" }}>

                                    <td> <div className='con-ideas'>Using uk Three mobile phone in vegas  - Las Vegas Message ... <p>tripadvisor.co.uk</p> </div> </td>
                                    <td><select><option>0 keywords</option></select></td>
                                    <td><select><option>0 Links</option></select></td>

                                </tr>
                                <tr>

                                    <td> <div className='con-ideas'>Using uk Three mobile phone in vegas  - Las Vegas Message ... <p>tripadvisor.co.uk</p> </div> </td>

                                    <td><select><option>0 keywords</option></select></td>
                                    <td><select><option>0 Links</option></select></td>
                                </tr>



                            </tbody>
                        </table>
                        <p className='v_All'>View all Content Ideas</p>


                    </div>

                    <div>

                        <div className='hm-b-ta'>
                            <div className='cmd mb-3'>
                                <div> Keyword Rank </div> <CSVLink data={detailsCSV}> <button className="cm-btn"> Export To CSV</button> </CSVLink>
                            </div>
                            <table className="table" style={{ borderBottom: "none !important" }}>
                                <thead style={{ borderBottom: "none !important" }}>
                                    <tr style={{ borderBottom: "none !important" }} >
                                        <th scope="col" style={{ borderBottom: "none !important" }}>Keyword</th>
                                        <th scope="col">Ranks</th>
                                        <th scope="col">URL</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        AllprDta && AllprDta.map((allpr) => {
                                            return allpr.data.tasks && allpr.data.tasks.map((data) => {
                                                return data.result && data.result.map((reData, key) => {
                                                    return AllOrganic && AllOrganic.slice(startData, endData).map((taData, key) => {
                                                        return <tr key={key}>
                                                            <td>{reData.keyword}</td>
                                                            {<td>{taData.rank_group}</td>}
                                                            <td><a href={taData.url} target='_blank' rel='noreferrer'>{taData.url} </a></td>
                                                        </tr>
                                                    })
                                                })
                                            })
                                        })

                                    }
                                </tbody>
                            </table>

                            <div className='tab-pagination'>
                                <span>   Rows Per Page : </span><select value={postPerPage} onChange={PerPageChange}>
                                    <option value={5}>5 </option>
                                    <option value={10}>10 </option>
                                    <option value={20} >20 </option>
                                </select><span onClick={() => getPrevPage()}> <i className="fa-solid fa-caret-left"></i></span> <span >{firstPageIndex} of {lastPageIndex} </span> <span onClick={() => getNextPage()}> <i className="fa-solid fa-caret-right"></i></span>
                            </div>

                        </div>

                        <p className='v_All' onClick={AllKeywords}>View all Keywords Ideas</p>
                        <hr />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Keywords;