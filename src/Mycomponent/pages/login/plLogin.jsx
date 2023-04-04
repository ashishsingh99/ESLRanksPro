import React from 'react'
import { useNavigate } from 'react-router-dom';
import pllogin from '../../Assets/seoimg/login.svg'
const PlLogin = () => {
    const navigate = useNavigate()

    const gotologin = () => {
        navigate('/login')
    }
    return (
        <div className='pllogin-div'>


            <div className='pllogin'>
                <div>
                    <img src={pllogin} alt='please login img'></img>
                </div>
                <div className='pl-con'>
                    <div>
                        <h1>
                            Please Login
                        </h1>
                        <p>
                            lorem ispum sect ospos jhndj post catig jdgsofig al <br></br>
                            alt sec longsic asgtiv pti
                        </p>
                        <button className='cm-btn' onClick={gotologin}>Go To Login Page</button>
                    </div>
                </div>
            </div>





        </div>
    )
}

export default PlLogin;