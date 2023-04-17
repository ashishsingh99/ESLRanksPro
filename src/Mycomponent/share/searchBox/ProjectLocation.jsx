import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ProjectLocation = () => {
    const dispatch = useDispatch();
    const usercurrentprojectlocation = useSelector(state => state.usercurrentprojectlocation);
    const CurrentLocation = useRef([])
    // const showCurrentLocation = useState([]);
    const current_location = localStorage.getItem('current_location')

    CurrentLocation.current = usercurrentprojectlocation
    CurrentLocation.current = CurrentLocation.current && CurrentLocation.current.filter((obj, index, self) => {
        return index === self.findIndex((t) => (
            t.location_code === obj.location_code
        ))

    })
    // console.log('CurrentLocation.current', CurrentLocation.current)

    const LocationHandler = (e) => {
        localStorage.setItem('current_location', e.location_name)
        localStorage.setItem('current_location_code', e.location_code)
        window.location.reload(false);
    }

    return (
        <>
            <div className='prLocation'>
                <p>{current_location}</p>
                <div style={{background:'#fff'}}> <i className='fa-solid fa-caret-down ms-2'> </i> </div>
                <div className='prloc_drop'>
                    <ul>
                        {
                            CurrentLocation.current && CurrentLocation.current.map((location, index) => {
                                return (
                                    <li key={index} onClick={() => LocationHandler(location)}>
                                        {location.location_name}
                                    </li>
                                )
                            })
                        }

                    </ul>

                </div>
            </div>
        </>
    )
}

export default ProjectLocation;