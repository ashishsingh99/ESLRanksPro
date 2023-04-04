import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
const websiteUrl = localStorage.getItem('websiteurl')


const GrowTraffic = () => {
    const navigate = useNavigate();
    const Traffic = () => {

        navigate('/');
        window.location.reload(false);

    }
    return (
        <div className='cmd-b'>
            <pre className='mb-0 pb-0' >
                <h6>
                    <b>  Thanks to choosing and Grow Traffic </b>
                </h6>
            </pre>
            <button className='cm-btn' onClick={Traffic}>Done & Go to Home </button>



        </div>
    )
}

export default GrowTraffic;


