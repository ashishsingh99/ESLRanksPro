import React from 'react'
import '../../css/login.css'
import logi from '../../Assets/login.jpg';
import logo from '../../Assets/seoimg/logo.png'
import google from '../../Assets/google.png'
import facebook from '../../Assets/facebook.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Reffral_Get, regester_withAPi, regester_withOTP } from '../../../services/constants'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const Register = () => {
    const dispatch = useDispatch();
    const [mydata, setMydata] = useState('');
    const [name, setName] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [OTP, setOTP] = useState(false);
    const [OTPVail, setOtpVail] = useState(0);
    const [refftalMatch, setReffralMatch] = useState([])
    const [refAlert, setRefAlert] = useState(false)
    const [matchedRefitems, setmatchedRefItems] = useState({})

    // navigator
    const navigate = useNavigate();


    useEffect(() => {
        axios.get(Reffral_Get())
            .then((res) => {
                console.log('refferal codes get', res.data.data)
                setReffralMatch(res.data.data);
            })
    }, [])

    const reffralHandler = (e) => {

        if (email === '' || password === '' || password2 === '' || name === '') {
            setRefAlert('Please fill all details')
        }
        else {
            const foundPlan = refftalMatch.find((plan) => plan.codes.includes(e));
            // console.log('foundPlan', foundPlan)
            if (foundPlan) {
                setRefAlert('Matched');
                // console.log(foundPlan.plan_name, foundPlan.validity, foundPlan.id, e)

                const reffralItems = {
                    email: email,
                    code_valid: e,
                    valid: foundPlan.validity,
                    code_name: foundPlan.plan_name
                }
                setmatchedRefItems(reffralItems);


            } else {
                if (e === '') {
                    setRefAlert('')
                }
                else {
                    setRefAlert('Please enter valid refferal code');
                }
            }

        }

    }

    const login = (e) => {
        e.preventDefault();

        if (email === '' || password === '' || password2 === '' || name === '') {
            setRefAlert('Please fill all details')
        }
        else if (OTP !== false) {

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
                        setOTP(false)
                        setMydata('');
                        axios.post('https://eslrankspro.com/api/user/codevalid/', matchedRefitems)
                        navigate('/login')

                    }).catch((res) => {
                        setMydata(res.response.data.email);
                    })
            }
            else {
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
                                    {/* <div className='lg-sn-op'>
                                        <ul>
                                            <li> <img src={google} alt='google img'></img>continue with google</li>
                                            <li><img src={facebook} alt='facebook img'></img>continue with facebook</li>
                                        </ul>
                                    </div>
                                    <div className='lg-line'> </div> */}
                                    <div className='reg-anim pt-2'>



                                        {OTP ?
                                            <div className='optic-scroll'>
                                                <div className='desg'> </div>

                                                <input type='number' placeholder='Enter OTP' onChange={(e) => setOtpVail(e.target.value)}  ></input>
                                                <label id='lb'>Enter OTP</label>
                                                <p className='vl-msd-line'>{mydata} </p>

                                            </div> : <div className=''>
                                                <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} ></input>
                                                <label id='lb'>Email*</label>
                                                <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} ></input>
                                                <label id='lb'>Name*</label>


                                                <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} autoComplete='false'></input>
                                                <label id='lb'>Password*</label>

                                                <input type='password' placeholder=' Confirm Password' onChange={(e) => setPassword2(e.target.value)} autoComplete='false'></input>
                                                <label id='lb'>Password*</label>


                                                <input type='' placeholder='Referral Code' onChange={(e) => reffralHandler(e.target.value)} autoComplete='false'></input>
                                                <label id='lb'>Referral</label>
                                                <p className='vl-msd-line'>{refAlert === 'Matched' ? <span className='text-success'>{refAlert} </span> : refAlert} </p>


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