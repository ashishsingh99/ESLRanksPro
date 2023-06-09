
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { KEYWORD_POST, PROJECT_POST } from "../../../services/constants";
import Keygatter from "./keygatter";
import Papa from 'papaparse';

export const AddKeyword = () => {
    // navigator
    const navigate = useNavigate();

    const userKeywordlimit = useSelector(state => state.userkeywordlimit);
    const UserKeywordLength = useSelector(state => state.userkeywordlength);
    const NewProjectUrl = useSelector(state => state.newprojecturl);
    const userselectedprojectallid = useSelector(state => state.userselectedprojectallid);
    const addprojectlocation = useSelector(state => state.addprojectlocation)


    // local storage
    const email = localStorage.getItem('email')
    // const locationcode = localStorage.getItem('locationcode');
    const webURL = localStorage.getItem("websiteurl");


    // useState data hooks
    const [keyword, setKeyword] = useState('')
    const [item, setItem] = useState([]);
    const [itemAlert, setItemAlert] = useState(false);
    const [deviceAlert, setDeviceAlert] = useState(false);
    const [minLenth, setMinLengthAlert] = useState(false);
    const [sameKeyAlert, setSameKeyALert] = useState(false)

    // useRef data hooks
    const desktop = useRef(null);
    const mobile = useRef(null);
    const deviceType = useRef([]);
    const messagesEndRef = useRef(null);
    const sameKeyword = useRef(false);
    const ALLLocationCode = useRef([])
    const inputRef = useRef(null);

    // this useEffect function for ctrl + / target input
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.ctrlKey && event.key === '/') {
                event.preventDefault(); // prevent default behavior of the browser
                inputRef.current.focus();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    useEffect(() => {
        if (NewProjectUrl === false) {
            navigate('/')
        }

    })

    // useeffect to auto run the function
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
        // console.log('item', item)
    }, [item])


    // add keyword input value functions
    const ItemEvent = (e) => {
        setKeyword(e.target.value);
    }

    // keyword delete by id
    const DeleteKey = (id) => {
        setItem((oldItems) => {
            return oldItems.filter((arrelm, index) => {
                return index !== id;
            })
        })
    }

    // set keyword to the array form with conditions
    const Listofitems = (e) => {

        e.preventDefault();

        // this filtration for user already keyword exist from the project.in this
        // function , A bug, this function cant stop that keyword that comes after devicemode check box change
        // for that i comment this function for now

        // userprojectalldetails && userprojectalldetails.filter((prdetails) => {
        //     console.log(deviceType.current)
        //     console.log('prdetails', prdetails)

        //     if (deviceType.current.length === 1 && deviceType.current[0] === prdetails.deviceType) {
        //         return prdetails.keyword.filter((filKey) => {

        //             if (filKey === keyword) {
        //                 console.log('checking same keyword desktop', filKey, keyword)
        //                 return sameKeyword.current = filKey

        //             }

        //         })
        //     }

        //     else if (deviceType.current.length === 2) {
        //         prdetails.keyword.filter((filKey) => {

        //             if (filKey === keyword) {
        //                 console.log('checking same keyword both', filKey, keyword)
        //                 return sameKeyword.current = filKey

        //             }

        //         })
        //     }
        //     else {
        //         return sameKeyword.current = false
        //     }

        // })

        item.filter(filtered => {
            if (filtered === keyword) {
                // console.log('sameKeywords', filtered)
                sameKeyword.current = filtered
            }
        });


        if (keyword.trim().length === 0) {
            e.preventDefault();
        }
        else if (deviceType.current.length === 0) {
            setDeviceAlert(true);
        }
        else if (keyword === sameKeyword.current) {
            setSameKeyALert(true);
            localStorage.removeItem('filtered')
        }

        else if (item.length * deviceType.current.length * addprojectlocation.length + Number(UserKeywordLength) >= Number(userKeywordlimit)) {
            setItemAlert(true)
        }

        else {
            setItem((olditems) => {
                return [...olditems, keyword]
            })

            setKeyword('');
            setItemAlert(false)
            setMinLengthAlert(false)
            setSameKeyALert(false);

        };



    }


    const Typedesktop = () => {
        if (desktop.current === null) {
            desktop.current = 'desktop'
            deviceType.current.push('desktop')
            // console.log(deviceType.current)
            setDeviceAlert(false);
        }
        else {
            desktop.current = null
            const index = deviceType.current.indexOf('desktop')
            deviceType.current.splice(index, index + 1)
            // console.log(deviceType.current)
        }
    }

    const Typemobile = () => {
        if (mobile.current === null) {
            mobile.current = 'mobile'
            deviceType.current.push(mobile.current)
            // console.log(deviceType.current)
            setDeviceAlert(false)

        }
        else {
            mobile.current = null
            const index = deviceType.current.indexOf('mobile')
            deviceType.current.splice(index, index + 1)
            // console.log(deviceType.current)
        }
    }


    // on submit data send to the rest api
    const getproject = () => {

        if (deviceType.current.length === 0) {
            setDeviceAlert(true);
        }
        else if (item.length === 0) {
            setMinLengthAlert(true)
        }
        else if (item.length * deviceType.current.length + addprojectlocation.length + Number(UserKeywordLength) > Number(userKeywordlimit)) {
            setItemAlert(true)
        }

        else if (webURL !== null && NewProjectUrl === webURL) {

            // that condition run when the user come from add keyword btn from ranktable

            const dataTwo = addprojectlocation && addprojectlocation.map(loca => {
                return deviceType.current && deviceType.current.map(detype => {
                    return item && item.map((itemData) => {
                        return [{
                            keyword: itemData,
                            language_code: "en",
                            location_code: loca.location_code,
                            device: detype
                        }]
                    })
                })
            })

            const datatwoHandler = { data: dataTwo[0].flat() }
            // console.log('keyword post', datatwoHandler)
            axios.post(KEYWORD_POST(), datatwoHandler)

            addprojectlocation && addprojectlocation.filter(loca => {
                return ALLLocationCode.current.push(loca.location_code)
            })

            // console.log('locationCode', ALLLocationCode.current)

            const itemData = JSON.stringify(item)
            const deviceTypeData = JSON.stringify(deviceType.current)
            const locations = JSON.stringify(ALLLocationCode.current)
            axios.put('https://app.eslrankspro.com/api/user/updatekeyword/' + userselectedprojectallid[0] + '/?key=' + itemData + '&device=' + deviceTypeData + '&location_code=' + locations)
            navigate('/addpr/gotraffic')

        }
        else {

            // posting keywords
            const dataTwo = addprojectlocation && addprojectlocation.map(loca => {
                return deviceType.current && deviceType.current.map(detype => {
                    return item && item.map((itemData) => {
                        return [{
                            keyword: itemData,
                            language_code: "en",
                            location_code: loca.location_code,
                            device: detype
                        }]
                    })
                })
            })

            const datatwoHandler = { data: dataTwo[0].flat() }

            // console.log('keyword post', datatwoHandler)
            axios.post(KEYWORD_POST(), datatwoHandler)


            const data = addprojectlocation && addprojectlocation.map(loca => {
                return deviceType.current && deviceType.current.map(dataType => {
                    return {
                        email: email,
                        weburl: NewProjectUrl,
                        deviceType: dataType,
                        location_name: loca.location_name,
                        location_code: loca.location_code,
                        keyword: item,
                    }
                })
            })


            const dataHandler = {
                keyword: data.flat()
            }
            // console.log('dataHandler', dataHandler)
            axios.post(PROJECT_POST(), dataHandler)

            navigate('/addpr/gotraffic')
        }
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                // console.log(results.data); // log the parsed data to the console
                const keywordSet = results.data;
                keywordSet && keywordSet.map(res => {

                    setItem((olditems) => {
                        return [...olditems, res.Keyword]
                    })
                })

            }
        });

    }

    const handleMessagePaste = (event) => {
        event.preventDefault();
        if (deviceType.current.length === 0) {
            setDeviceAlert(true);
        }

        else if (item.length * deviceType.current.length * addprojectlocation.length + Number(UserKeywordLength) >= Number(userKeywordlimit)) {
            setItemAlert(true)
        }

        else {
            const clipboardText = event.clipboardData.getData("text/plain");
            const messages = clipboardText.split(/[\n;,]/);
            setItem(item.concat(messages));
            console.log(item)

        }

    }

    return <>

        <div className='cmd-b'>
            <div className="w-100 text-center">
                <h1>Add Keyword </h1>
                <p className="mb-0">
                    Track keywords to get regular ranking updates and daily content opportunities
                </p>

                <div className="cmc">
                    <div className="dev-type">
                        <div>
                            <label htmlFor='typedesktop'>
                                <div className="dev-btn" >
                                    <input id="typedesktop" name="typedesktop" value={desktop} type='checkbox' onChange={Typedesktop} />   <span>Desktop</span>
                                </div>
                            </label>
                            <label htmlFor='typemobile'>
                                <div className="dev-btn">
                                    <input id="typemobile" name="typemobile" value={mobile} type='checkbox' onChange={Typemobile} /> <span> Mobile</span>
                                </div>
                            </label>
                        </div>
                        <div>
                            keyword :  {deviceType.current.length !== 0 && item.length !== 0 ? item.length * deviceType.current.length * addprojectlocation.length + Number(UserKeywordLength) : item.length + Number(UserKeywordLength)}
                        </div>



                    </div>

                </div>
                <div className=' add-pr-url'>
                    <form>


                        {
                            item === '' ? '' :
                                <div>
                                    <ul className='key-fm-ul' >                             {
                                        item.map((itemVal, index) => {
                                            return <Keygatter
                                                key={index}
                                                id={index}
                                                text={itemVal}
                                                onSelect={DeleteKey}
                                            />
                                        })
                                    }
                                        <div ref={messagesEndRef}></div>

                                    </ul>
                                </div>
                        }
                        <input style={itemAlert ? { borderColor: "red" } : {}} type='text' placeholder='Type keyword' value={keyword} onPaste={handleMessagePaste} onChange={ItemEvent} ref={inputRef} />
                        <p className="vl-msd-line mt-0" > <div className="importCsv"> Paste or <label htmlFor='importCSV'>import from csv </label></div>{itemAlert ? " You have reached your maximum limit of " + userKeywordlimit + ' keywords' : deviceAlert ? "Please select device type" : minLenth ? " Please enter atleast one keyword" : sameKeyAlert ? 'This keyword is already exits' : false} </p>
                        <div>

                            <div className="d-none">
                                <input type="file" accept=".csv" id="importCSV" name="importCSV" placeholder="dfd" onChange={handleFileUpload} />
                            </div>
                        </div>
                        <div className='add-pr-btn'>
                            <Link to={-1}><button className='cm-btn' type='button'>Back</button></Link>
                            <button className='cm-btn' type='submit' style={{ visibility: 'hidden' }} onClick={Listofitems}>Next</button>
                            <div className={item.length === 0 ? 'ho-btn' : ''}><button className='cm-btn ' type='button' onClick={getproject}>Submit</button></div>

                        </div>

                    </form>
                </div>

            </div>



        </div>
    </>
}