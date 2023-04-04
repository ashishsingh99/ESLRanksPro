import React from 'react'
import { useNavigate } from 'react-router-dom';
import pllogin from '../../Assets/seoimg/login.svg'
const PlAdd = () => {
    const navigate = useNavigate()

    const gotologin = () => {
        navigate('/addpr')
    }
    return (
        <div className='pllogin-div'>


            <div className='pllogin'>
                <div>
                    <img src={pllogin} alt='please login img'></img>
                </div>
                <div className='pl-con'>
                    <div>
                        <h5>
                            Please Add Your First Project
                        </h5>
                        <p>
                            lorem ispum sect ospos jhndj post catig jdgsofig al <br></br>
                            alt sec longsic asgtiv pti
                        </p>
                        <button className='cm-btn' onClick={gotologin}>Add Project</button>
                    </div>
                </div>
            </div>





        </div>
    )
}

export default PlAdd;