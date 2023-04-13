import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import '../../css/addProject.css';
import PlLogin from '../login/plLogin';

const AddProject = () => {

  const loginOut = useSelector(state => state.loginout)

  if (loginOut === true) {
    return (
      <div className='add-Pr'>
        <div className='cmd-b'> Add Project</div>
        <Outlet />


      </div>
    )
  }
  else {
    return <>
      <PlLogin />
    </>
  }


}

export default AddProject;
