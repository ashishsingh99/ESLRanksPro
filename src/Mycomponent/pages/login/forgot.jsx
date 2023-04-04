import React, { useState } from 'react';
import '../../css/login.css'
import logi from '../../Assets/login.jpg';
import logo from '../../Assets/seoimg/logo.png'
import google from '../../Assets/google.png'
import facebook from '../../Assets/facebook.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgot_withApi, login_withAPi, reset_password_withApi } from '../../../services/constants'
import axios from 'axios';
import { useEffect } from 'react';
import { baseUrlPath } from '../../../Navigation/constant';

const Forgot = () => {
    const dispatch = useDispatch();
    const [mydata, setMydata] = useState('');
    const [Email, setEmail] = useState("");
    // const [alert, setAlert] = useState(false);
    // const [sentSuccees, setSentSuccees] = useState(false);
    const [password, setPassword] = useState(null);
    const [coPassword, setCoPassword] = useState(null);
    const [varifyByMail, setVarifybymail] = useState();
    const UID = localStorage.getItem('uid');
    const UToken = localStorage.getItem('utoken');
    const varifyMail = localStorage.getItem('varifybymail');
    const navigate = useNavigate();

    useEffect(() => {
        const Url = document.URL;
        setVarifybymail(varifyMail);

        if (Url === 'http://localhost:3000/api/user/reset/' + UID + '/' + UToken || Url === 'https://' + baseUrlPath + '/api/user/reset/' + UID + '/' + UToken) {
            localStorage.setItem('varifybymail', true)
        }
    })

    const Forgotpass = (e) => {
        e.preventDefault();
        if (varifyByMail === 'true') {
            if (password === coPassword && password !== null && coPassword !== null) {
                let item = {
                    password: password,
                    password2: coPassword
                }
                axios.post(reset_password_withApi() + UID + '/' + UToken + '/', item)
                localStorage.removeItem('uid')
                localStorage.removeItem('utoken')
                localStorage.removeItem('varifybymail')
                navigate('/login')
            }
            else {
                alert('password & confirm did not match');
            }
        }
        else {
            if (Email === '') {
                setMydata('Please enter a correct email')
            }
            else {
                let item = {
                    email: Email,
                };
                axios.post(forgot_withApi(), item)
                    .then(res => {

                        setMydata(res.data.msg)
                        // setAlert(true)
                        // setSentSuccees(res.data.msg)
                        localStorage.setItem('uid', res.data.uid)
                        localStorage.setItem('utoken', res.data.token)
                        // navigate('/login')
                    })
            }

        }
    }




    return (
        <>

            <div className='lg-main-div'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-12 d-none d-md-block'>
                            <div className='lg-le-div'>
                                <div className='img-div-le'>
                                    <img className='lg_pg-logo' src={logo} alt='login img'>
                                    </img>

                                    <img className='lg_pg-image' src={logi} alt='login img'>
                                    </img>
                                </div>

                            </div>
                        </div>
                        <div className='col-12 col-md-6 '>
                            <div className='lg-ri-div'>
                                <form>
                                    <div className='lg-ri-fm'>
                                        <h3 className='text-center'>{varifyByMail === null ? 'Forgot Password' : 'Reset Your Password'}</h3>
                                        <div className='lg-sn-op'>
                                            <ul>
                                                <li> <img src={google} alt='google img'></img>continue with google</li>
                                                <li><img src={facebook} alt='facebook img'></img>continue with facebook</li>
                                            </ul>
                                        </div>
                                        <div className='lg-line'> </div>
                                        {
                                            varifyByMail === null ? <div>  <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} ></input>
                                                <label id='lb'>Email</label>
                                                <p className='vl-msd-line '> <div>{mydata ? mydata : ''}</div> </p>

                                            </div>
                                                : <div>
                                                    <input type='text' placeholder='Password' onChange={(e) => setPassword(e.target.value)} ></input>
                                                    <label id='lb'>Password</label>

                                                    <input type='text' placeholder='Confirm Password' onChange={(e) => setCoPassword(e.target.value)} ></input>
                                                    <label id='lb'>Confirm Password</label>


                                                </div>
                                        }
                                        <div>
                                            <button type='submit' className='lg-button' onClick={Forgotpass}>Submit</button>
                                            <h6 className='rs-now'> Don't have an account? <Link to='/login'> <b> Login Now </b> </Link></h6>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Forgot;