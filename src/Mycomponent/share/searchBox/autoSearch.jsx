import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';

const AutoSearch = () => {
    const userallprojectskeywords = useSelector(state => state.userallprojectdetails);
    const [filPeNameUrl, setFilprNameUrl] = useState([])
    const commonNameUrl = useRef('')
    const [searched, setSearched] = useState([])

    useEffect(() => {
        userallprojectskeywords && userallprojectskeywords.map(prnameurl => {
            setFilprNameUrl(obj => {
                return [...obj, prnameurl.weburl]
            })
        })

        if (filPeNameUrl !== []) {
            const filteredPrNameUrl = Array.from(new Set(filPeNameUrl))
            commonNameUrl.current = filteredPrNameUrl
        }
        // console.log('commonNameUrl.current', commonNameUrl.current)


    }, [userallprojectskeywords, filPeNameUrl[0], searched])

    const SearchProject = (text) => {
        if (!text) {
            setSearched([])
        }
        else {
            let matches = commonNameUrl.current.filter((prname) => {
                const regex = new RegExp(`${text}`, "gi");
                return prname.match(regex) || prname.match(regex);
            })
            setSearched(matches);
            // console.log('serached name matched', searched)
        }
    }

    const SearchedSubmit = (e) => {
        if (searched.length !== 0 && searched[0] !== 'undefined') {
            // e.preventDefault()
            localStorage.setItem('websiteurl', searched[0]);
            localStorage.removeItem('current_location_code')

        }
    }
    const SelectedLI = (res) => {
        localStorage.setItem('websiteurl', res);
        window.location.reload(false);
    }
    return (
        <div style={{ position: 'relative' }}>
            <div className='hm-b1-inp'>
                <div className='hm-b1-i'>
                    <i className="fa fa-search"></i>
                </div>
                <form onSubmit={SearchedSubmit}>
                    <input type='search' placeholder='Search Project' onChange={(e) => SearchProject(e.target.value)}></input>
                </form>
            </div>

            {searched ? <div className='searchFilter'>
                <ul>
                    {
                        searched && searched.map((res, key) => <li key={key} onClick={() => SelectedLI(res)}>{res}</li>)
                    }
                </ul>
            </div> : false
            }
        </div>
    )
}

export default AutoSearch;