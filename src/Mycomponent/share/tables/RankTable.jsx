import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import KeywordAllRanksChart from "../charts/constant";
import RippleButton from "../components/rippleButton";
import { curday } from "../upDater/constant";
import axios from "axios";


// keyword ranking show handler component
const RankTable = () => {

    // functional variables
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // localstorage Data
    const webURL = localStorage.getItem("websiteurl");
    const deviceType = localStorage.getItem("devicetype");
    const current_location_code = Number(localStorage.getItem('current_location_code'))

    // Redux Data
    const keywordData = useSelector((state) => state.keyworddata);
    const UserAllKeywordResult = useSelector((state) => state.userallkeywordresult);
    const UserAllPendingResult = useSelector((state) => state.userallpendingresult);
    const oldKeywordData = useSelector((state) => state.oldkeyworddata);
    const UserSelectedPrId = useSelector((state) => state.userselectedprojectallid)
    const isProject = useSelector(state => state.isproject);
    const usercurrentprojectlocation = useSelector(state => state.usercurrentprojectlocation);



    // useStates
    const [detailsCSV, setDetailsCSV] = useState([])
    const [KeywordMovedup, setKeywordMovedUp] = useState([])
    const [Keyworddown, setKeywordMovedDown] = useState([])
    const [tableShowMore, setTableShowMore] = useState(3)
    const [keywordAlloldDataAlert, setKeywordAlloldDataAlert] = useState(false);
    const [CurrentKeyword, setCurrentKeyword] = useState(null);
    const [progressBar, setProgressBar] = useState([]);
    const selectedKeyword = useRef([])
    const [addkeywordAlert, setAddKeywordAlert] = useState(false);
    const [locationViewer, setLocationViewer] = useState([])
    const CurrentLocation = useRef([])

    CurrentLocation.current = usercurrentprojectlocation
    CurrentLocation.current = CurrentLocation.current && CurrentLocation.current.filter((obj, index, self) => {
        return index === self.findIndex((t) => (
            t.location_code === obj.location_code
        ))

    })

    // useEffect data rendring
    useEffect(() => {
        if (oldKeywordData !== 0) {
            UserAllKeywordResult && UserAllKeywordResult.map((res, key) => {
                // console.log({ keyword: res.keyword, rank: keywordData[key].rank_group, prevRank: oldKeywordData[key].rank_group, url: keywordData[key].url })
                setDetailsCSV((obj) => {
                    return [...obj, { Keyword: res.keyword, Positions: keywordData[key].rank_group, Previous: oldKeywordData.length !== 0 && oldKeywordData.length > key ? oldKeywordData[key].rank_group : "0", URL: keywordData[key].url }]
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


    // alerts function
    const Chartalert = (keyword) => {
        setKeywordAlloldDataAlert(true)
        setCurrentKeyword(keyword)
        // alert(keyword)
    }

    const CloseChartAlert = () => {
        setCurrentKeyword(null)
        setKeywordAlloldDataAlert(false)
    }

    // OnClick functions
    const AddKeywordHandler = () => {
        if (webURL === null) {
            navigate('/addpr')
        }
        else {
            dispatch({ type: "NEWPROJECTURL", payload: webURL });
            setAddKeywordAlert(true);
            // navigate('/addpr/addkeyword');
        }

    }

    // onClick function for device type change handler
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



    // table Keyword Delete
    const ChooseKeywordDelete = (e) => {

        const index = selectedKeyword.current.indexOf(e)

        if (index === -1) {
            // if the number does not exist in the array, add it
            selectedKeyword.current.push(e);
        } else {
            // if the number exists in the array, remove it
            selectedKeyword.current.splice(index, 1);
        }

        console.log(selectedKeyword.current);
    }

    const KeywordDelete = () => {
        // selectedKeyword.current.push('nokeyword')
        // console.log(selectedKeyword.current)
        // selectedKeyword.current.map(res => {
        const selectedKeywordarray = JSON.stringify(selectedKeyword.current)

        axios.put('https://app.eslrankspro.com/api/user/delkeyword/' + Number(UserSelectedPrId[0]) + '/?key=' + selectedKeywordarray + '&device=' + deviceType + '&location_code=' + current_location_code)


        const timerId = setInterval(() => window.location.reload(false), 1500);
        setTimeout(() => { clearInterval(timerId) }, 1500);

        // console.log(UserSelectedPrId[0], selectedKeywordarray)


    }


    const selectKeyViewerHand = (e) => {
        // setLocationViewer((obj) => {
        //     return [...obj, { location_code: e.location_code, location_name: e.location_name }]
        // })

        setLocationViewer((obj) => {
            // Check if an object with the same location_code already exists in the array
            const existingObj = obj.find((o) => o.location_code === e.location_code);

            // If an object already exists, return the original array without adding a new object
            if (existingObj) {
                return obj;
            }
            // If an object doesn't exist, add a new object to the array and return the updated array
            else {
                return [...obj, { location_code: e.location_code, location_name: e.location_name }];
            }
        });

    }

    const SelectKeyViewerDelete = (key) => {
        setLocationViewer(locationViewer.filter((item, index) => index !== key));
    }


    const LocationSender = () => {
        if (locationViewer.length === 0) {
            alert('please select location')
        }
        else {
            dispatch({ type: "ADDPROJECTLOCATION", payload: locationViewer })
            navigate('/addpr/addkeyword')
        }

    }


    // onClick function for table pagination
    const tableShowHandler = () => {
        setTableShowMore(tableShowMore + 5);
    }

    const tableHideHandler = () => {
        setTableShowMore(3);
    }

    return (
        <>
            {/* keyword ranking table  */}
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
                        <button
                            style={{ borderRadius: "0px" }}
                            className={"cm-btn-b ms-3"}
                            onClick={() => KeywordDelete()}
                        >
                            <div className="btn-hov">Delete Keywords </div>
                        </button>
                    </div>
                    <div className="d-flex">
                        <div className="me-3"> <CSVLink filename={curday() + ' ' + webURL + '.csv'} data={detailsCSV ? detailsCSV : 'null'} > <RippleButton > CSV <i className="fa fa-solid fa-download fa-bounce"></i> </RippleButton> </CSVLink> </div>
                        <RippleButton onClick={() => AddKeywordHandler()}>Add Keyword  <i className="fa-solid fa-plus "></i> </RippleButton>
                    </div>


                </div>
                <table className="table" >
                    <thead >
                        <tr >

                            <th scope="col" >
                                <div >Keywords <div className="Tooltip">    <span className="Tooltiptext">Words that people type into Google</span><i className="fa-solid fa-circle-question fa-beat-fade ms-2"></i> </div> </div>
                            </th>
                            <th scope="col">
                                <div >Positions <div className="Tooltip">    <span className="Tooltiptext">The Position this URL is ranked in Google search</span><i className="fa-solid fa-circle-question fa-beat-fade ms-2"></i> </div> </div>
                            </th>
                            <th scope="col">
                                <div >Previous <div className="Tooltip">    <span className="Tooltiptext">The Position this URL is ranked in Google search</span><i className="fa-solid fa-circle-question fa-beat-fade ms-2"></i> </div> </div>
                            </th>
                            <th scope="col">
                                <div >URL <div className="Tooltip">    <span className="Tooltiptext">The particular URL that ranks for the given keyword</span><i className="fa-solid fa-circle-question fa-beat-fade ms-2"></i> </div> </div>
                            </th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    {isProject === true ?
                        <tbody>

                            {
                                // .slice(0, tableShowMore)  add slice when ever you need to pagination
                                UserAllKeywordResult === false ? <PleaseWait />
                                    : UserAllKeywordResult.length === 0 && UserAllPendingResult.length === 0 ? <No_deviceTypeKeyword />
                                        : keywordData !== 0 ? keywordData && keywordData.map((res, key) => {
                                            return (
                                                <tr key={key}>

                                                    <td> <input type='checkbox' value={UserAllKeywordResult[key].keyword} onChange={(e) => ChooseKeywordDelete(e.target.value)} style={{ width: "auto", margin: '0 5px 0 0', top: '2px', position: "relative" }} /> {UserAllKeywordResult[key].keyword}</td>
                                                    <td>
                                                        <div className="cml">
                                                            <div style={{ minWidth: "60px" }}>   {res.rank_group} </div>

                                                            <div className="growArrow ">
                                                                {progressBar.length !== 0 ? progressBar[key].growth !== true ? <i className="fa-solid fa-sort-down  text-danger "></i> : <i className="fa-solid fa-sort-up text-success" style={{ bottom: "-7px", position: 'relative' }}></i> : <div><i className="fa-solid fa-sort-up text-success" style={{ bottom: "-7px", position: 'relative' }}></i></div>}
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
                                        })
                                            : false

                            }



                            {
                                UserAllPendingResult && UserAllPendingResult.map((pendingKey, key) => {
                                    return <tr key={key}>

                                        <td><input type='checkbox' value={pendingKey} onChange={(e) => ChooseKeywordDelete(e.target.value)} style={{ width: "auto", margin: '0 5px 0 0', top: '2px', position: "relative" }} /> {pendingKey}</td>
                                        <td className="text-success">Pending</td>
                                        <td className="text-success">Pending</td>
                                        <td className="text-success">Pending</td>
                                        <td>  </td>
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

            {/* pop chart for keyword old ranking show  */}
            <div className="KeywordRanksChart" style={keywordAlloldDataAlert ? { display: "flex" } : { display: "none" }}>
                <div className='keywordCanvas '>
                    <div className="w-100 text-end">
                        <button className=" cm-btn-b ms-auto" onClick={() => CloseChartAlert()} >x</button>
                    </div>
                    <KeywordAllRanksChart Keyword={CurrentKeyword} />
                </div>
            </div>


            <div>
                {
                    addkeywordAlert ? <div className='pop ' >
                        <div className='popBody'>
                            {/* <div className='exeMark'><h1>?</h1> </div> */}
                            <h4 style={{ color: '#455197' }}>Please Select Location for Add Keyword </h4 >
                            {/* <form> */}
                            <div className='pop-form'>
                                <div style={{ minWidth: "60vw" }}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="ranTab_countryChoose">
                                                <ul >
                                                    {
                                                        CurrentLocation.current && CurrentLocation.current.map((res, key) => {
                                                            return <li key={key} onClick={() => { selectKeyViewerHand(res) }}>{res.location_name}</li>
                                                        })
                                                    }

                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="ranTab_countryChoose">
                                                <ul>
                                                    {
                                                        locationViewer && locationViewer.map((res, key) => {
                                                            return <li key={key}>{res.location_name}<div className="ms-auto" onClick={() => { SelectKeyViewerDelete(key) }}>  <i className="fa fa-solid fa-close"></i></div></li>
                                                        })
                                                    }

                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='cmd mt-3'><button className='cm-btn-b' onClick={() => setAddKeywordAlert(false)}> Cancel</button><button className='cm-btn' onClick={() => LocationSender()} >Add Keyword</button></div>
                                {/* </form> */}
                            </div>
                        </div>
                    </div> : false
                }
            </div>
        </>
    );
};

export default RankTable;


// no project handler component
export const Noproject = () => {
    return (
        <tr>
            <td>No Project Added -----</td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    );
};


// please wait handler component
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


// please wait handler component
export const No_deviceTypeKeyword = () => {
    return (
        <tr>
            <td>Please add keyword for this device type -----

            </td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    );
};


