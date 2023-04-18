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

        if (Number(UserKeywordLength) >= Number(userkeywordlimit)) {
            navigate('/')
            alert('you have exceeded your plan keyword limit    ')
        }
        if (NewProjectUrl === false) {
            navigate('/')
        }

    });

    useEffect(() => {
        country.filter(obj => {
            if (obj.location_name === countryName) {
                // setProjectLocations((prdetails) => {
                //     return [...prdetails, { location_code: obj.location_code, location_name: obj.location_name }]
                // })

                setProjectLocations((prdetails) => {
                    // Check if an object with the same location_code already exists in the array
                    const existingObj = prdetails.find((o) => o.location_code === obj.location_code);

                    // If an object already exists, return the original array without adding a new object
                    if (existingObj) {
                        return prdetails;
                    }
                    // If an object doesn't exist, add a new object to the array and return the updated array
                    else {
                        return [...prdetails, { location_code: obj.location_code, location_name: obj.location_name }];
                    }
                });

                locationcode.current = obj.location_code
            }
        })


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
            localStorage.setItem('locationcode', locationcode.current);
            localStorage.setItem('location', countryName);
            localStorage.setItem('language', language);

            // const projectLOcdetails = projectLocations.filter(
            //     (obj, index, self) => index === self.findIndex((t) => t.location_name === obj.location_name)
            // );
            dispatch({ type: "ADDPROJECTLOCATION", payload: projectLocations });
            // console.log(projectLOcdetails, 'addkeyword');
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


                            <select value={countryName} onChange={(e) => setCountryName(e.target.value)}>
                                <option> {pllocation}</option>

                                {
                                    country.map((item, key) => (
                                        <option value={item.location_name} key={key}>
                                            {item.location_name}
                                        </option>
                                    ))
                                }

                            </select>




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