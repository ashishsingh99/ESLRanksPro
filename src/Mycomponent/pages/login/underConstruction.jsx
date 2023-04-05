import React from 'react'
import nopage from '../../Assets/seoimg/underworking.gif';

const UnderConstruction = () => {
    return (
        <div >
            <div className='row'>
                <div className='col-md-6 col-12'>
                    <div className='construcImg cmc'>
                        <img src={nopage}></img>
                    </div>
                </div>
                <div className='col-md-6 col-12'>
                    <div className='cmc' style={{height:"100%"}}>
                        <h2 className='text-center'title="Go back to the home page" type='button' style={{ color: "#2E5B9A" }} > <i> " This Awesome Page is under Construction , Soon you will see something amazing here "  </i></h2>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default UnderConstruction;