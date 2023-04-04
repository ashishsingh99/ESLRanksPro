import React from 'react'
import nopage from '../../Assets/seoimg/nopage.png';
const NoPage = () => {
  return (
    <div className='cmc text-center' style={{ height: "100vh" }}><div>
      <img height={300} src={nopage}></img>
      <div style={{position:"relative"}}>
        <h1 data-title="Go back to the home page" type='button' style={{ color: "#3F3D56" }} > <i>Page Not Found   </i></h1>
      </div>
    </div></div>
  )
}

export default NoPage