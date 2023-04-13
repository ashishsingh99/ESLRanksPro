import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ProjectLocation = () => {
    const dispatch = useDispatch();
    const usercurrentprojectlocation = useSelector(state => state.usercurrentprojectlocation)
    const current_location = localStorage.getItem('current_location')

    const LocationHandler = (e) => {
        localStorage.setItem('current_location', e.location_name)
        localStorage.setItem('current_location_code', e.location_code)

        window.location.reload(false);
    }

    return (
        <>
            <div className='prLocation'>
                <span>{current_location}</span>
                <i className='fa-solid fa-earth fa-spin ms-2'> </i>
                <div className='prloc_drop'>
                    <ul>
                        {
                            usercurrentprojectlocation && usercurrentprojectlocation.map((location, index) => {
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