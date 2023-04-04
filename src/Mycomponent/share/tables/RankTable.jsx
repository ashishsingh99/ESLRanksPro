import React, { useEffect } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import KeywordAllRanksChart from "../charts/constant";
import RippleButton from "../components/rippleButton";

const RankTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux Data

    const keywordData = useSelector((state) => state.keyworddata);
    const UserAllKeywordResult = useSelector((state) => state.userallkeywordresult);
    const UserAllPendingResult = useSelector((state) => state.userallpendingresult);
    const detailsCSV = useSelector((state) => state.userallkeywordresult)
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
    const tableShowHandler = () => {
        setTableShowMore(tableShowMore + 5);
    }

    const tableHideHandler = () => {
        setTableShowMore(3);
    }


    useEffect(() => {

        // console.log('keywordData', keywordData)
        // console.log('oldKeywordData', oldKeywordData)
        // console.log('OLDKEYWORDDATA', OLDKEYWORDDATA)
        // setOldKeywordData(OLDKEYWORDDATA);


        keywordData && keywordData.filter((res, key) => {

            const resRankgroup = res.rank_group
            // console.log('res.RANKGROUP', resRankgroup)
            const oldataRankgroup = oldKeywordData[key] && oldKeywordData[key].rank_group
            // console.log('oldataRankgroup', oldataRankgroup)
            if (resRankgroup === 'no rank') {
                // alert('nannn')
                setProgressBar(obj => {
                    return [...obj, { result: 0, growth: true }]
                })

            }
            else if (oldataRankgroup === 'no rank') {
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

    // useEffect(() => {
    //     keywordData && keywordData.filter((res, key) => {

    //         const resRankgroup = res.rank_group
    //         const oldataRankgroup = oldKeywordData && oldKeywordData[key].rank_group
    //         if (resRankgroup && oldataRankgroup === 'no rank') {
    //             // alert('nannn')
    //             setProgressBar(obj => {
    //                 return [...obj, { result: 0, growth: true }]
    //             })

    //         }
    //         else if (resRankgroup - oldataRankgroup <= 0) {
    //             setProgressBar(obj => {
    //                 return [...obj, { result: oldataRankgroup - resRankgroup, growth: true }]
    //             })
    //         }
    //         else {
    //             setProgressBar(obj => {
    //                 return [...obj, { result: resRankgroup - oldataRankgroup, growth: false }]
    //             })
    //         }

    //     })
    //     console.log(' setProgressBar', progressBar)

    // }, [progressBar[0], ])


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
                        <div className="me-3"> <CSVLink data={detailsCSV ? detailsCSV : 'null'} > <RippleButton > CSV <i className="fa fa-solid fa-download"></i> </RippleButton> </CSVLink> </div>
                        <RippleButton onClick={() => AddKeywordHandler()}>Add Keyword +</RippleButton>
                    </div>


                </div>
                <table className="table" >
                    <thead >
                        <tr >
                            <th scope="col" >
                                Keyword
                            </th>
                            <th scope="col">Ranks</th>
                            <th scope="col">Previous Rank</th>
                            <th scope="col">URL</th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    {isProject === 'true' ?
                        <tbody>

                            {
                                UserAllKeywordResult === false ? <Noproject /> : UserAllKeywordResult.length === 0 ? false : keywordData !== 0 && oldKeywordData.length !== 0 ? keywordData && keywordData.slice(0, tableShowMore).map((res, key) => {
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
                <p className='v_All'> <a onClick={() => tableShowHandler()}> View all Keywords</a> <b>/</b> <a onClick={() => tableHideHandler()}>hide</a></p>
                <hr />

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

