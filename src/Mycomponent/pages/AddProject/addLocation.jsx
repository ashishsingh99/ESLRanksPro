import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RippleButton from '../../../Mycomponent/share/components/rippleButton'
export const AddCountry = () => {
    // usestate
    const [language, setLanguage] = useState('en');
    const [countryName, setCountryName] = useState('india');
    const [pllocation, setPllocation] = useState('Location');
    const locationcode = useRef('2356');
    const [projectLocations, setProjectLocations] = useState([]);

    // useNaviagte
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux state
    const country = useSelector(state => state.getcountry);
    const userkeywordlimit = useSelector(state => state.userkeywordlimit);
    const UserKeywordLength = useSelector(state => state.userkeywordlength);
    const NewProjectUrl = useSelector(state => state.newprojecturl);


    useEffect(() => {

        if (Number(UserKeywordLength) >= userkeywordlimit) {
            navigate('/')
            alert('you have exceeded your plan keyword limit    ')
        }
        if (NewProjectUrl === false) {
            navigate('/')
        }

    });

    useEffect(() => {
        country.tasks && country.tasks.map((index, key) => (
            index.result && index.result.slice(0, 100).filter(obj => {
                if (obj.location_name === countryName) {
                    setProjectLocations((prdetails) => {
                        return [...prdetails, { location_code: obj.location_code, location_name: obj.location_name }]
                    })

                    locationcode.current = obj.location_code
                }
            })
        ))

    }, [countryName])

    // console.log(projectLocations)


    const Languages = (e) => {

        if (countryName === '') {
            setPllocation('Please select Location')
        }
        if (projectLocations.length === 0) {
            setPllocation('Please select Location')
            setCountryName('')
        }
        else {
            localStorage.setItem('locationcode', locationcode.current)
            localStorage.setItem('location', countryName)
            localStorage.setItem('language', language)
            const projectLOcdetails = projectLocations.filter(
                (obj, index, self) => index === self.findIndex((t) => t.location_name === obj.location_name)
            );
            dispatch({ type: "ADDPROJECTLOCATION", payload: projectLOcdetails });
            console.log(projectLOcdetails, 'addkeyword');
            navigate('/addpr/addkeyword');

        }


    }

    const removeLocations = (e) => {
        setProjectLocations((olditems) => {
            return olditems.filter((arrelm, index) => {
                return index !== e
            })
        })

    }

    return <>
        <div className='cmd-b'>
            <div className=' add-pr-url'>
                <div>
                    <h1>Languages and Location</h1>
                    <p>
                        Attract the right traffic by entering the languages and locations you do business in.
                    </p>
                    <div className="cmd" style={{ alignItems: 'baseline' }}>
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


                            <div className='add-country-box'>
                                <ul>
                                    {
                                        projectLocations && projectLocations.map((res, key) => {
                                            return <li key={key}>{res.location_name}   <div className="ms-auto" onClick={() => removeLocations(key)}><i className="fa fa-solid fa-close "></i> </div></li>
                                        })
                                    }
                                </ul>

                            </div>

                        </div>
                    </div>

                    <div className='add-pr-btn'>
                        <Link to={-1}>    <button className='cm-btn-b'>Back</button> </Link>
                        <RippleButton onClick={() => Languages()}>Next</RippleButton>

                    </div>
                </div>
            </div>
        </div>
    </>
}