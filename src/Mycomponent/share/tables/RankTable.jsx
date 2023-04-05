import React, { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import KeywordAllRanksChart from "../charts/constant";
import RippleButton from "../components/rippleButton";
import { curday } from "../upDater/constant";

const RankTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux Data

    const keywordData = useSelector((state) => state.keyworddata);
    const UserAllKeywordResult = useSelector((state) => state.userallkeywordresult);
    const UserAllPendingResult = useSelector((state) => state.userallpendingresult);
    const [detailsCSV, setDetailsCSV] = useState([])
    const oldKeywordData = useSelector((state) => state.oldkeyworddata);
    const [KeywordMovedup, setKeywordMovedUp] = useState([])
    const [Keyworddown, setKeywordMovedDown] = useState([])
    const [tableShowMore, setTableShowMore] = useState(3)
    // const [oldKeywordData, setOldKeywordData] = useState(0);

    // localstorage Data
    const isProject = localStorage.getItem("IsProject");
    const webURL = localStorage.getItem("websiteurl");
    const deviceType = localStorage.getItem("devicetype");
    const [keywordAlloldDataAlert, setKeywordAlloldDataAlert] = useState(false);
    const [CurrentKeyword, setCurrentKeyword] = useState(null);
    const [progressBar, setProgressBar] = useState([]);

    useEffect(() => {
        if (oldKeywordData !== 0) {
            UserAllKeywordResult && UserAllKeywordResult.map((res, key) => {
                console.log({ keyword: res.keyword, rank: keywordData[key].rank_group, prevRank: oldKeywordData[key].rank_group, url: keywordData[key].url })
                setDetailsCSV((obj) => {
                    return [...obj, { Keyword: res.keyword, Rank: keywordData[key].rank_group, Previous_Rank: oldKeywordData[key].rank_group, URL: keywordData[key].url }]
                })
            })
        }

    }, [oldKeywordData])


    useEffect(() => {

        // console.log('keywordData', keywordData)
        // console.log('oldKeywordData', oldKeywordData)
        // console.log('OLDKEYWORDDATA', OLDKEYWORDDATA)
        // setOldKeywordData(OLDKEYWORDDATA);


        keywordData && keywordData.filter((res, key) => {

            const resRankgroup = res.rank_group && res.rank_group
            // console.log('res.RANKGROUP', resRankgroup)
            const oldataRankgroup = oldKeywordData[key] && oldKeywordData[key].rank_group
            // console.log('oldataRankgroup', oldataRankgroup)
            if (resRankgroup === 'no rank' || resRankgroup === undefined) {
                // alert('nannn')
                setProgressBar(obj => {
                    return [...obj, { result: 0, growth: true }]
                })

            }
            else if (oldataRankgroup === 'no rank' || oldataRankgroup === undefined) {
                setProgressBar(obj => {
                    return [...obj, { result: 0, growth: true }]
                })
            }
            else if (resRankgroup - oldataRankgroup <= 0) {
                setProgressBar(obj => {
                    return [...obj, { result: oldataRankgroup - resRankgroup, growth: true }]
                })

                setKeywordMovedUp((res) => {
                    return [...res, KeywordMovedup]
                })
                // alert('succeed')
            }
            else {
                setProgressBar(obj => {
                    return [...obj, { result: resRankgroup - oldataRankgroup, growth: false }]
                })
                setKeywordMovedDown((res) => {
                    return [...res, Keyworddown]
                })

            }

        })

        dispatch({ type: "RANKMOVEDUP", payload: KeywordMovedup.length });
        dispatch({ type: "RANKMOVEDDOWN", payload: Keyworddown.length });

        // localStorage.setItem('movedup', KeywordMovedup.length)
        // localStorage.setItem('moveddown', Keyworddown.length)
        // console.log(' setProgressBar', progressBar)
    }, [oldKeywordData, progressBar[0]]);

    const ChangeDesktopType = () => {
        if (deviceType !== "desktop") {
            localStorage.setItem("devicetype", "desktop");
            window.location.reload(false);
        } else {
            return false;
        }
    };

    const ChangeMobileType = () => {
        if (deviceType !== "mobile") {
            localStorage.setItem("devicetype", "mobile");
            window.location.reload(false);
        } else {
            return false;
        }
    };

    const Chartalert = (keyword) => {
        setKeywordAlloldDataAlert(true)
        setCurrentKeyword(keyword)
        // alert(keyword)
    }

    const CloseChartAlert = () => {
        setCurrentKeyword(null)
        setKeywordAlloldDataAlert(false)
    }

    const AddKeywordHandler = () => {
        if (webURL === null) {
            navigate('/addpr')
        }
        else {
            dispatch({ type: "NEWPROJECTURL", payload: webURL });
            navigate('/addpr/addcountry')
        }

    }

    const tableShowHandler = () => {
        setTableShowMore(tableShowMore + 5);
    }

    const tableHideHandler = () => {
        setTableShowMore(3);
    }

    return (
        <>
            <div className="hm-b-ta">
                <div className="cmd mb-3">
                    <div>
                        <button
                            style={{ borderRadius: "0px" }}
                            className={deviceType === "desktop" ? "cm-btn" : "cm-btn-b"}
                            onClick={ChangeDesktopType}
                        >
                            <div className="btn-hov">Desktop </div>
                        </button>
                        <button
                            style={{ borderRadius: "0px" }}
                            className={deviceType === "mobile" ? "cm-btn" : "cm-btn-b"}
                            onClick={ChangeMobileType}
                        >

                            <div className="btn-hov">Mobile </div>
                        </button>
                    </div>
                    <div className="d-flex">
                        <div className="me-3"> <CSVLink filename={curday() + ' ' + webURL + '.csv'} data={detailsCSV ? detailsCSV : 'null'} > <RippleButton > CSV <i className="fa fa-solid fa-download"></i> </RippleButton> </CSVLink> </div>
                        <RippleButton onClick={() => AddKeywordHandler()}>Add Keyword +</RippleButton>
                    </div>


                </div>
                <table className="table" >
                    <thead >
                        <tr >
                            <th scope="col" >
                                <div >Keywords <div className="Tooltip">    <span class="Tooltiptext">Words that people type into Google</span><i class="fa-solid fa-circle-question ms-2"></i> </div> </div>
                            </th>
                            <th scope="col">
                                <div >Positions <div className="Tooltip">    <span class="Tooltiptext">The Position this URL is ranked in Google search</span><i class="fa-solid fa-circle-question ms-2"></i> </div> </div>
                            </th>
                            <th scope="col">
                                <div >Previous <div className="Tooltip">    <span class="Tooltiptext">The Position this URL is ranked in Google search</span><i class="fa-solid fa-circle-question ms-2"></i> </div> </div>
                            </th>
                            <th scope="col">
                                <div >URL <div className="Tooltip">    <span class="Tooltiptext">The particular URL that ranks for the given keyword</span><i class="fa-solid fa-circle-question ms-2"></i> </div> </div>
                            </th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    {isProject === 'true' ?
                        <tbody>

                            {
                                // .slice(0, tableShowMore)  add slice when ever you need to pagination
                                UserAllKeywordResult === false ? <Noproject /> : UserAllKeywordResult.length === 0 ? false : keywordData !== 0 && oldKeywordData.length !== 0 ? keywordData && keywordData.map((res, key) => {
                                    return (
                                        <tr key={key}>
                                            <td> {UserAllKeywordResult[key].keyword}</td>
                                            <td>
                                                <div className="cml">
                                                    <div style={{ minWidth: "60px" }}>   {res.rank_group} </div>

                                                    <div className="growArrow ">
                                                        {progressBar.length !== 0 ? progressBar[key].growth !== true ? <i className="fa-solid fa-sort-down text-danger "></i> : <i className="fa-solid fa-sort-up text-success" style={{ bottom: "-7px", position: 'relative' }}></i> : <div><i className="fa-solid fa-sort-up text-success" style={{ bottom: "-7px", position: 'relative' }}></i></div>}
                                                        {progressBar.length !== 0 ? progressBar[key].result : '0'}
                                                    </div>

                                                    {/* <div className="">
                                                            {progressBar.length !== 0 ? progressBar[key].growth !== true ? <div className="groIcon bg-danger">{progressBar[key].result}</div> : <div className="groIcon ">{progressBar[key].result}</div> : '...'}

                                                        </div> */}

                                                </div>

                                            </td>
                                            <td>{oldKeywordData.length !== 0 && oldKeywordData.length > key ? oldKeywordData[key].rank_group : "0"}</td>
                                            <td>
                                                <div className="tb-link-lmt" title={res.url} type='button'>
                                                    <a href={res.url === "not data found" ? "/" : res.url} target="_blank" rel="noreferrer" >
                                                        {res.url}
                                                    </a>
                                                </div>
                                            </td>
                                            <td ><ul><li onClick={() => Chartalert(UserAllKeywordResult[key].keyword)}><i className="fa-solid fa-eye" ></i> </li></ul></td>
                                        </tr>
                                    );
                                }) : <PleaseWait />

                            }



                            {
                                UserAllPendingResult && UserAllPendingResult.map((pendingKey, key) => {
                                    return <tr key={key}>
                                        <td>{pendingKey}</td>
                                        <td className="text-success">Pending</td>
                                        <td className="text-success">Pending</td>
                                        <td className="text-success">Pending</td>
                                    </tr>
                                })
                            }

                        </tbody>
                        :
                        <tbody>
                            <Noproject />
                        </tbody>
                    }
                </table>


                {/* this is pagination bar for upper table with already add with slice fun or showmore useState  */}

                {/* <p className='v_All '> <a onClick={() => tableShowHandler()}> View all Keywords</a> <b>/</b> <a onClick={() => tableHideHandler()}>hide</a></p> */}
                {/* <hr /> */}

            </div>


            <div className="KeywordRanksChart" style={keywordAlloldDataAlert ? { display: "flex" } : { display: "none" }}>
                <div className='keywordCanvas '>
                    <div className="w-100 text-end">
                        <button className=" cm-btn-b ms-auto" onClick={() => CloseChartAlert()} >x</button>
                    </div>
                    <KeywordAllRanksChart Keyword={CurrentKeyword} />
                </div>
            </div>
        </>
    );
};

export default RankTable;

export const Noproject = () => {
    return (
        <tr>
            <td>No Project Added ---------</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    );
};

export const PleaseWait = () => {
    return (
        <tr>
            <td>Please Wait ...

            </td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    );
};

