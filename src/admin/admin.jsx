import React from 'react'
import SideBar from './share/sideBar';
import './css/admin.css'
import TopBar from './share/topBar';
import { Outlet, useNavigate } from 'react-router-dom';
import ManageData_Configure from '../confrigration/constants';
import Login from '../Mycomponent/pages/login/login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Admin = () => {
  const dispatch = useDispatch();
  const isAdminLogin = useSelector(state => state.loginout)
  const navigate = useNavigate();
  useEffect(() => {
    if (isAdminLogin === true) {
      // navigate('/admin/dashboard')
    }
  }, [])
  dispatch({ type: "SHOWMENU", payload: false });


  return (
    <>
      <ManageData_Configure />
      {
        isAdminLogin === true ?
          <div className='admin-Layout'>

            <SideBar />
            <div className='admin-body'>
              <TopBar />
              <div className='admin-ground' onClick={() => { dispatch({ type: "SHOWMENU", payload: false }); }}>
                <Outlet />
              </div>
            </div>
          </div> : <Login />
      }
    </>
  )
}

export default Admin;