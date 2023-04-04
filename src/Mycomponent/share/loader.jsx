import React from 'react';
import lIMG from '../Assets/seoimg/logo.png'

const Loader = () => {
    return (
        <div className='loading-skeleton'>


            {/* this is a side rotate box */}
            <div>
                <div className='cmc' style={{ position: "fixed", top: '-2.5rem', left: "-6rem", height: '100vh', width: '100vw', animation: "loadingrt 1s infinite  "}}>
                    <div style={{ width: "50px", height: "50px", background: 'blue' }}></div>
                </div>

                <div className='cmc' style={{ position: "fixed", top: '-2.5rem', left: "-6rem", height: '100vh', width: '100vw', animation: "loadingrt2 1s infinite " }}>
                    <div style={{ width: "50px", height: "50px", background: 'yellow' }}></div>
                </div>

                <div className='cmc' style={{ position: "fixed", top: '-2.5rem', left: "-6rem", height: '100vh', width: '100vw', animation: "loadingrt3 1s infinite " }}>
                    <div style={{ width: "50px", height: "50px", background: 'red' }}></div>
                </div>

            </div>

            {/* small box */}
            <div >
                <div className='cmc' style={{ position: "fixed", height: '100vh', width: '100vw', top:"0" , left:"0"}}>
                    <div className='' style={{ width: "5px", height: "5px", background: "blue", animation: "loadingrt4 .9s infinite " }}></div>
                </div>
                <div className='cmc' style={{ position: "fixed", height: '100vh', width: '100vw', top:"0", left:"0" }}>
                    <div className='' style={{ width: "5px", height: "5px", background: "red", animation: "loadingrt4 .8s infinite " }}></div>
                </div>
                <div className='cmc' style={{ position: "fixed", height: '100vh', width: '100vw', top:"0" , left:"0"}}>
                    <div className='' style={{ width: "5px", height: "5px", background: "yellow", animation: "loadingrt4 .7s infinite " }}></div>
                </div>
            </div>

            {/* company logo bar  */}
            <div className='cmc' style={{ position: "fixed", top: '-2.5rem', left: "0", height: '100vh', width: '100vw',}}>
                <div role="status"> <img style={{ width: "250px", animation: "loading 1s infinite alternate" }} src={lIMG} alt='LIMG'></img>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>

            {/* dott loader  */}
            <div className='cmc' style={{ position: "fixed", top: '0', left: "0", height: '100vh', width: '100vw', }}>

                <div style={{ color: '#455197', width: "0.8rem", height: '0.8rem', animation: " .70s linear infinite spinner-grow" }} className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div style={{ color: '#F6BB26', width: "0.9rem", height: '0.9rem', animation: " .75s linear infinite spinner-grow" }} className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div style={{ color: '#EE2E2D', width: "1rem", height: '1rem', animation: " .80s linear infinite spinner-grow" }} className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>

            </div>

            {/* <div className='cmc' style={{ position: "fixed", top: '0', left: "0", height: '100vh', width: '100vw', backgroundColor: 'rgb(12,12,33,0.1)' }}>
                <div style={{ color: '#F6BB26', animation:" .100s linear infinite spinner-grow"}} className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div> */}

        </div>


    )
}

export default Loader;