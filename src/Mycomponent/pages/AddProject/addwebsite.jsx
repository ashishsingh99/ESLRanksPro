import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RippleButton from "../../share/components/rippleButton";

export const AddWebsite = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [websiteURL, setWebsiteUrl] = useState('');
    const [websiteName, setWebsiteName] = useState('');
    const [FilteredUrl, setFilteredUrl] = useState();
    const [valida, setValida] = useState('');
    const userallprojectname = useSelector(state => state.userallprojectname)
    const userProjectlimit = useSelector(state => state.userprojectlimit)
    const USERALLPROJECTLength = useSelector(state => state.userprojectlength)
    const [ShowAlert, setShowAlert] = useState(false)

    // authentication lmt for customer Project
    useEffect(() => {
        if (USERALLPROJECTLength >= userProjectlimit) {
            setShowAlert(true)
        }
        else {
            setShowAlert(false)
        }
    })

    useEffect(() => {
        const filteredUrl = userallprojectname && userallprojectname.filter(res => {
            if (res === websiteURL) {
                return res;
            }
            else {
                setValida('')
            }

        });
        setFilteredUrl(filteredUrl[0]);
        // console.log(FilteredUrl)
    }, [websiteURL, websiteName])



    const Addwebsite = () => {
        if (websiteURL.length === 0) {
            setValida('please provide all the details');
        }
        else if (websiteName.length === 0) {
            setValida('please provide all the details');
        }
        else if (FilteredUrl === websiteURL) {
            setValida('This project Url is already exist please add another project');

        }
        else {

            // when user not subscribe to any plan
            dispatch({ type: "NEWPROJECTURL", payload: websiteURL });

            // USERKEYWORDLENGTH set 0 because add project intial value has to be 0
            dispatch({ type: "USERKEYWORDLENGTH", payload: 0 });

            localStorage.setItem('websitename', websiteName);
            navigate('addcountry');
        }


    }



    return <>
        <div className='cmd-b'>
            <div className=' add-pr-url'>
                <div>

                    <h1>Add Website</h1>
                    <p>
                        Start tracking and improving your website’s SEO traffic.
                    </p>
                    <div>
                        <input type='text' autoComplete='true' placeholder='website url' onChange={(e) => setWebsiteUrl(e.target.value)}></input>
                    </div>
                    <div>
                        <input type='text' autoComplete='true' placeholder='website Name' onChange={(e) => setWebsiteName(e.target.value)}></input>
                        {valida ? <p className="vl-msd-line mt-0 text-right">{valida}</p> : false}
                    </div>
                    <div className='add-pr-btn'>
                        <Link to={-1}>  <button className='cm-btn-b'  >Back</button> </Link>
                        <RippleButton className='cm-btn' onClick={() => Addwebsite()}>Next</RippleButton>
                    </div>
                </div>

            </div>


            {
                ShowAlert ? <div className='pop' onClick={() => setShowAlert(false)}  >
                    <div className='popBody'>
                        <div className='exeMark'><h1>?</h1> </div>
                        <p>Your project limit exceeded if you want to add more projects please Upgrade your plan  </p>
                        <div className='cmd' style={{ justifyContent: "space-evenly" }}><button onClick={() => navigate(-1)} className='cm-btn-b'> Cancel</button><button onClick={() => navigate('/upgrade')} className='cm-btn'> upgrade</button></div>
                    </div>
                </div> : false
            }
        </div>
    </>
}