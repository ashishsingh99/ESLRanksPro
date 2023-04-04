import React from 'react'
import '../css/sidebar.css';
import logo from "../../Mycomponent/Assets/seoimg/logo.png";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SideBar = () => {
    const show = useSelector(state => state.showmenu);
    return (
        <>
            {/* desktop side bar */}
            <div className='side-bar' >
                <div className='sideBar_logo'>
                    <img src={logo}></img>
                </div>
                <div className='sideBar_list'>
                    <ul>
                        <li><NavLink to='dashboard'>   <i className="fa-solid fa-table"></i>Dashboard</NavLink> </li>
                        <li><NavLink to='users'><i className='fa-solid fa-users'></i>users</NavLink> </li>
                        <li ><NavLink to='adminkeywords'> <i className='fa-solid fa-search'></i>keywords </NavLink></li>
                        <li><NavLink to='plans'><i className="fa-brands fa-ideal"></i>plans </NavLink></li>
                        <li><NavLink to='codes'> <i className="fa-solid fa-tag"></i>codes </NavLink></li>
                    </ul>
                </div>
            </div>


            {/* this is for mobile menuBar  */}
            <div className='side-bar' style={{ display: show ? 'block' : 'none' }}>
                <div className='sideBar_logo'>
                    <img src={logo}></img>
                </div>
                <div className='sideBar_list'>
                    <ul>
                        <li><NavLink to='dashboard'>   <i className="fa-solid fa-table"></i>Dashboard</NavLink> </li>
                        <li><NavLink to='users'><i className='fa-solid fa-users'></i>users</NavLink> </li>
                        <li ><NavLink to='adminkeywords'> <i className='fa-solid fa-search'></i>keywords </NavLink></li>
                        <li><NavLink to='plans'><i className="fa-brands fa-ideal"></i>plans </NavLink></li>
                        <li><NavLink to='codes'> <i className="fa-solid fa-tag"></i>codes </NavLink></li>
                    </ul>
                </div>
            </div>



        </>
    )
}

export default SideBar;