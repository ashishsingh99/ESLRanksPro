
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { KEYWORD_POST, PROJECT_POST } from "../../../services/constants";
import Keygatter from "./keygatter";

export const AddKeyword = () => {
    const userprojectalldetails = useSelector(state => state.userallprojectdetails)
    const userKeywordlimit = useSelector(state => state.userkeywordlimit)
    const UserKeywordLength = useSelector(state => state.userkeywordlength)
    const NewProjectUrl = useSelector(state => state.newprojecturl);

    // local storage
    const email = localStorage.getItem('email')
    const locationcode = localStorage.getItem('locationcode')

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



    // state manage
    // navigator
    const navigate = useNavigate();

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

            else if (item.length * deviceType.current.length + Number(UserKeywordLength) >= Number(userKeywordlimit)) {
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

    // on submit data send to the rest api
    const getproject = () => {
        if (deviceType.current.length === 0) {
            setDeviceAlert(true);
        }
        else if (item.length === 0) {
            setMinLengthAlert(true)
        }
        else if (item.length * deviceType.current.length + Number(UserKeywordLength) > Number(userKeywordlimit)) {
            setItemAlert(true)
        }
        else {

            // posting keywords
            var dataTwo = {
                data: deviceType.current && deviceType.current.map(detype => {
                    return item && item.map((itemData) => {
                        return {
                            keyword: itemData,
                            language_code: "en",
                            location_code: locationcode,
                            device: detype
                        }
                    })
                }),
                weburl: NewProjectUrl,
                email: email
            }
            axios.post(KEYWORD_POST(), dataTwo)


            var data = {
                keyword: deviceType.current && deviceType.current.map(dataType => {
                    return {
                        email: email,
                        weburl: NewProjectUrl,
                        keyword: item,
                        deviceType: dataType
                    }
                })
            }
            axios.post(PROJECT_POST(), data)

            navigate('/addpr/gotraffic')
        }
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



    return <>

        <div className='cmd-b'>
            <div className="w-100 text-center">
                <h1>Add Keyword </h1>
                <p>
                    Attract the right traffic by entering the  languages and locations you do business in.
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
                            keyword :  {deviceType.current.length !== 0 ? item.length * deviceType.current.length + Number(UserKeywordLength) : item.length + Number(UserKeywordLength)}
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
                        <input style={itemAlert ? { borderColor: "red" } : {}} type='text' placeholder='Type keyword' value={keyword} onChange={ItemEvent} />
                        <p className="vl-msd-line mt-0" >{itemAlert ? " You have reached your maximum limit of " + userKeywordlimit + ' keywords' : deviceAlert ? "Please select device type" : minLenth ? " Please enter atleast one keyword" : sameKeyAlert ? 'This keyword is already exits' : false}</p>

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