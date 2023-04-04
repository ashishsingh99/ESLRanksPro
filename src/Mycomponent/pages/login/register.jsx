import React from 'react'
import '../../css/login.css'
import logi from '../../Assets/login.jpg';
import logo from '../../Assets/seoimg/logo.png'
import google from '../../Assets/google.png'
import facebook from '../../Assets/facebook.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { regester_withAPi, regester_withOTP } from '../../../services/constants'
import axios from 'axios';
import { useState } from 'react';

const Register = () => {
    const dispatch = useDispatch();
    const [mydata, setMydata] = useState('');
    const [name, setName] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [OTP, setOTP] = useState(false);
    const [OTPVail, setOtpVail] = useState(0);
    const navigate = useNavigate();
    const login = (e) => {
        e.preventDefault();
        // dispatch({ type: 'LOADING' });

        if (OTP !== false) {

            if (OTPVail.length === 4 && Number(OTPVail) === OTP) {
                setMydata('');

                let item = {
                    email: email,
                    password: password,
                    password2: password2,
                    name: name,
                    tc: 'True',
                };
                axios.post(regester_withAPi(), item)
                    .then(res => {
                        // alert(res.data.msg)

                        setOTP(false)
                        setMydata('');
                        const mydata = res.data;
                        navigate('/login')
                        // console.warn('res.data', res)

                    }).catch((res) => {
                        setMydata(res.response.data.email);
                        // console.log('res', res)
                    })
            }
            else {
                // alert('otp did not match')
                setMydata('Otp did not match');
            }

        }
        else {
            setOTP(true);
            let item = {
                email: email,
            };
            axios.post(regester_withOTP(), item)
                .then(res => {
                    setOTP(res.data.otp)
                })

        }
        // dispatch({ type: 'NOTLOADING' })
    }

    return (
        <div className='lg-main-div'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 col-12 d-none d-md-block '>
                        <div className='lg-le-div'>
                            <div className='img-div-le'>
                                <img className='lg_pg-logo' src={logo} alt='login img'>
                                </img>

                                <img className='lg_pg-image' src={logi} alt='login img'>
                                </img>
                            </div>

                        </div>
                    </div>
                    <div className='col-md-6 col-12'>
                        <div className='lg-ri-div'>
                            <form>
                                <div className='lg-ri-fm' style={{ height: '100%' }}>
                                    <h3 className='text-center'>REGISTER</h3>
                                    <div className='lg-sn-op'>
                                        <ul>
                                            <li> <img src={google} alt='google img'></img>continue with google</li>
                                            <li><img src={facebook} alt='facebook img'></img>continue with facebook</li>
                                        </ul>
                                    </div>
                                    <div className='lg-line'> </div>
                                    <div className='reg-anim'>



                                        {OTP ?
                                            <div className='optic-scroll'>
                                                <div className='desg'> </div>

                                                <input type='number' placeholder='Enter OTP' onChange={(e) => setOtpVail(e.target.value)}  ></input>
                                                <label id='lb'>Enter OTP</label>
                                                <p className='vl-msd-line'>{mydata} </p>

                                            </div> : <div className=''>
                                                <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} ></input>
                                                <label id='lb'>Email</label>
                                                <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} ></input>
                                                <label id='lb'>Name</label>


                                                <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} autoComplete='false'></input>
                                                <label id='lb'>Password</label>

                                                <input type='password' placeholder=' Confirm Password' onChange={(e) => setPassword2(e.target.value)} autoComplete='false'></input>
                                                <label id='lb'>Password</label>


                                            </div>
                                        }
                                    </div>

                                    <div>
                                        <button type='submit' className='lg-button' onClick={login}>{OTP ? 'Register Now' : 'Send OTP'}</button>
                                        <h6 className='rs-now'> Already have an account ? <Link to='/login'>  <b>Login Now </b> </Link></h6>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Register;