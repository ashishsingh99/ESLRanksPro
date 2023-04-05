import React from 'react'
import '../css/profile.css'
import { Link } from 'react-router-dom';

const Profile = () => {

    const userName = localStorage.getItem('name')
    const userEmail = localStorage.getItem('email')
    return (
        <div>

            <div className='cmd-b'>
                <div className='w-100 profile-det'>
                    <div className='row'>
                        <div className='col-md-12 col-12'>
                            {/* <div className='cmc'>
                                <div className='profile-img'>
                                    <img src={userImg}></img>
                                </div>
                            </div> */}
                            <div>
                                <div className='c-line-name mb-4'><span>Profile</span> </div>

                                <div className='cmd'>
                                    <div >
                                        <ul className='pr-contact-de'>
                                            <li><h6>Name :</h6>{userName} </li>
                                            <li><h6>Email :</h6> {userEmail}</li>
                                            <li><h6>Password :</h6> **********  </li>

                                        </ul>
                                    </div>
                                  <Link to='/forgot'> <button className='cm-btn-b'>Change Password</button> </Link>
                                </div>


                                <div className='c-line-name mb-4'><span> User Membership</span> </div>
                                <div className='cmd'><h6>Membership  </h6> <a href='https://billing.stripe.com/p/login/test_7sIbMBgUe8nTbx63cc'><button className='cm-btn-b'>Manage Membership</button></a></div>
                                {/* <p>170 william street <br />
                                    New York, NY 10038-78-212-312
                                </p> */}


                            </div>
                        </div>
                        {/* <div className='col-md-12 col-12'>
                            <div className='cmd '>
                                <div>
                                    <div className='cmd'>
                                        <h5 className='mb-0'>{userName}</h5>
                                        <p className='mb-0 ms-3'><i className="fa-solid fa-location-dot"></i> India , Noida</p>
                                    </div>
                                    <p>Designer</p>

                                </div>
                                <div>
                                    <i className='fa-solid fa-bookmark'></i> Bookmark
                                </div>
                            </div>
                            <div className='mt-3'>
                                <p>Ranking</p>
                                <div className='FSC'>
                                    <h5 className='mb-0'>8,6 </h5>
                                    <div className='profile-svg'>
                                        <i className='fa-solid fa-star'></i>
                                        <i className='fa-solid fa-star'></i>
                                        <i className='fa-solid fa-star'></i>
                                        <i className='fa-solid fa-star'></i>
                                        <i className="fa-regular fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ul className='profile-mess_bar'>
                                    <li><i className='fa-solid fa-message'></i> Send Meassage</li>
                                    <li><i className='fa-solid fa-phone'></i> Contact</li>
                                    <li><i className='fa-solid fa-report'></i> Report User</li>
                                </ul>
                            </div>
                            <hr></hr>
                            <div>
                                <p>Contact Information</p>

                                <div >
                                    <ul className='pr-contact-de'>
                                        <li><h6>Phone :</h6> +91- XXXXXXXXXX</li>
                                        <li><h6>Email :</h6> {userEmail}</li>
                                        <li><h6>Site :</h6> www.eserachLogix.com</li>
                                        <li><h6>Address :</h6> 525 E 68th Street <br /> New York, NY 10651-78-156-187-60</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='mt-3'>
                                <p>Basic Information</p>
                                <ul className='pr-contact-de'>

                                    <li><h6>Birthday :</h6> DD-MM-YEAR</li>
                                    <li><h6>Gender :</h6> Male</li>

                                </ul>
                            </div>

                        </div> */}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile;