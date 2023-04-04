import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ProjectList = () => {
    const dispatch = useDispatch();
    const webUrl = localStorage.getItem('websiteurl');
    const userallprojectskeywords = useSelector(state => state.userallprojectdetails);
    const [filPeNameUrl, setFilprNameUrl] = useState([])
    const commonNameUrl = useRef('')
    const filteredRef = useRef('')


    useEffect(() => {

        userallprojectskeywords && userallprojectskeywords.map(prnameurl => {
            setFilprNameUrl(obj => {
                return [...obj, prnameurl.weburl]
            })
        })

        if (filPeNameUrl !== []) {
            const filteredPrNameUrl = Array.from(new Set(filPeNameUrl))
            // dispatch({ type: "USERALLPROJECTNAME", payload: filteredPrNameUrl })
            commonNameUrl.current = filteredPrNameUrl
        }

        filteredRef.current = commonNameUrl.current && commonNameUrl.current.filter(e => e !== webUrl)

        // console.log('filteredRef', filteredRef.current)

    }, [userallprojectskeywords, filPeNameUrl[0]])

    const SelectPrName = (e) => {
        localStorage.setItem('websiteurl', e.target.value)
        window.location.reload(false);
    }
    return (
        <select className='hm-b1-select' onChange={SelectPrName}>
            <option >{webUrl !== 'undefined' && webUrl ? webUrl : 'Add project'}</option>
            {filteredRef.current && filteredRef.current.map((as, key) => {
                return <option key={key}>{as}</option>
            })}
        </select>
    )
}

export default ProjectList;

