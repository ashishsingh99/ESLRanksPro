import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RippleButton from '../../../Mycomponent/share/components/rippleButton'
export const AddCountry = () => {
    const NewProjectUrl = useSelector(state=>state.newprojecturl);
    // usestate
    const [language, setLanguage] = useState('en')
    const [countryName, setCountryName] = useState('india');
    const [pllocation, setPllocation] = useState('Location')
    const locationcode = useRef('2356')

    // useNaviagte
    const navigate = useNavigate();

    // Redux state
    const country = useSelector(state => state.getcountry);
    const userkeywordlimit = useSelector(state => state.userkeywordlimit)
    const UserKeywordLength = useSelector(state=>state.userkeywordlength)


    useEffect(() => {

        if (Number(UserKeywordLength) >= userkeywordlimit) {
            navigate('/')
            alert('you have exceeded your plan keyword limit    ')
        }
        if(NewProjectUrl === false){
            navigate('/')
        }


        country.tasks && country.tasks.map((index, key) => (
            index.result && index.result.slice(0, 100).filter(obj => {
                if (obj.location_name === countryName) {
                    return locationcode.current = obj.location_code
                }
            })
        ))
    });


    const Languages = (e) => {
        e.preventDefault();

        if (countryName === '') {
            e.preventDefault();
            setPllocation('Please select Location')
        }
        else {
            e.preventDefault();
            localStorage.setItem('locationcode', locationcode.current)
            localStorage.setItem('location', countryName)
            localStorage.setItem('language', language)

            navigate('/addpr/addkeyword');
        }


    }

    return <>
        <div className='cmd-b'>
            <div className=' add-pr-url'>
                <form>
                    <h1>Languages and Location</h1>
                    <p>
                        Attract the right traffic by entering the languages and locations you do business in.
                    </p>
                    <div className="add-sel">
                        <div className="">
                            <label className="">Languages</label>
                        </div>
                        <select className='prSelone' onChange={(e) => setLanguage(e.target.value)} >
                            <option value='en'>English</option>

                        </select>
                    </div>
                    <div className='ms-3 add-sel'>
                        <label >Location</label>

                        {
                            country ? country.tasks && country.tasks.map((index, key) => (
                                <select key={key} value={countryName} onChange={(e) => setCountryName(e.target.value)}>
                                    <option> {pllocation}</option>
                                    {
                                        index.result && index.result.slice(0, 100).map((item, key) => (
                                            <option value={item.location_name} key={key}>
                                                {item.location_name}
                                            </option>
                                        ))
                                    }

                                </select>
                            ))
                                : <select >
                                    <option>select...</option>
                                </select>
                        }

                    </div>
                    <div className='add-pr-btn'>
                        <Link to={-1}>    <button className='cm-btn-b'>Back</button> </Link>
                        <RippleButton type='submit' onClick={Languages}>Next</RippleButton>
                    </div>
                </form>
            </div>
        </div>
    </>
}