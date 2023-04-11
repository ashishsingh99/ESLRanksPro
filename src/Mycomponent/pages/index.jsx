import React, { useRef, useState } from 'react';
import '../css/index.css';
import '../css/loader.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RankTable from '../share/tables/RankTable';
import AutoSearch from '../share/searchBox/autoSearch';
import ProjectList from '../share/searchBox/ProjectList';
import RippleButton from '../share/components/rippleButton';
import {  curday, perday } from '../share/upDater/constant';
import DoughnutChartone from '../share/charts/doughnutChart';
import axios from 'axios';
import { delete_Project } from '../../services/constants';
export const Home = () => {
  const allprojectDetails = useSelector(state => state.allprojectdetails);
  const RankMovedup = useSelector(state => state.rankmovedup);
  const RankMovedDown = useSelector(state => state.rankmoveddown);
  const loginOut = useSelector(state => state.loginOut);
  const [deleteAlert, setdeleteAlert] = useState(false)
  const dlProjectId = useRef([])




  const Do_Project_Delete = (allprojectDetails, _callBack) => {
    // const allprojectDetails = useSelector(state => state.allprojectdetails);

    // localStorage data
    const webURL = localStorage.getItem("websiteurl");
    const email = localStorage.getItem("email");

    allprojectDetails && allprojectDetails.map((res) => {
      res.keyword.filter((resfilter) => {
        if (resfilter.email === email && resfilter.weburl === webURL) {
          const projectId = Number(res.id);
          dlProjectId.current.push(projectId)
          // axios.delete(delete_Project(projectId))


        }
      })
    })
    dlProjectId.current = dlProjectId.current.concat('no')
    dlProjectId.current.map((res, key) => {

      if ('no' === res) {
        localStorage.removeItem("websiteurl");
        window.location.reload(false);

      }
      else {
        console.log('resfilter', res, key)
        const projectId = Number(res);
        axios.delete(delete_Project(projectId))

      }

    })


    console.log('dlProjectId.current', dlProjectId.current)




  }



  useEffect(() => {
    if (loginOut !== 'true') {

      // window.location.href = '#index.html'
    }
  })
  return (
    <div>
      <div className='hm-body'>
        <div className='cmd-b'>
          <div>
            <ProjectList />
            <RippleButton onClick={() => setdeleteAlert(true)} >    <i className="fa-solid fa-trash  "></i> </RippleButton>
            <Link to='/addpr'>  <RippleButton >    <i className="fa-solid fa-plus "></i>  Add Project  </RippleButton></Link>
          </div>
          <AutoSearch />
        </div>


        <div className='cmd-b'>
          <div className='w-100'>

            {/* <LastUpdate /> */}

            <div className=' hm-b2-con p-0'>
              <div className='hm-b2-cl ms-0'>
                <h5>Keyword Rankings</h5>
                <div className='hm-bg-move'>
                  <div className='hm-ng-18'>
                    <h2>
                      {/* {companyRank[0] ? companyRank[0] : 0} */}
                      {RankMovedup}
                    </h2>
                    <span>   Keywords <br /> Moved up </span>
                  </div>
                  <div className='hm-ng-18'>
                    <h2>
                      {/* {companyRank && companyRank[rankLength - 1] ? companyRank[rankLength - 1] : 0} */}
                      {RankMovedDown}
                    </h2>
                    <span>   Keywords <br /> moved down </span>
                  </div>
                </div>
                <p>
                  Data from <br />
                  {curday('/')}  to  {perday('/')}
                </p>
              </div>
              {/* <div className='hm-b2-cl '>
                  <h5>User Visit</h5>
                  <div className='hm-bg-move'>
                    <div className='hm-ng-18'>
                      <h2>1,989</h2>
                      <span>    Visits </span>
                    </div>
                    <div className='hm-ng-18'>

                    </div>
                  </div>
                  <p>
                    Data from <br />
                    Jan 03 , 2022 to  FEB 02, 2022
                  </p>
                </div>
                <div className='hm-b2-cl '>
                  <h5>Backlinks</h5>
                  <div className='hm-bg-move'>
                    <div className='hm-ng-18'>
                      <h2>71,387</h2>
                      <span>   Visits </span>
                      <p>See Backlinks</p>
                    </div>
                    <div className='hm-ng-18'>
                    </div>
                  </div>
                  <p>
                    Data from <br />
                    Jan 03 , 2022 to  FEB 02, 2022
                  </p>
                </div>
                <div className='hm-b2-cl ' >
                  <h5>On-Page SEO Score</h5>
                  <div className='hm-bg-move'>
                    <div className='hm-ng-18' style={{ width: '100%' }}>
                      <h2>73</h2>
                      <span>    Great </span>
                      <p>improve Seo Score</p>
                    </div>
                    <div className='hm-ng-18'>
                      <h2> </h2>
                    </div>
                  </div>
                  <p>
                    Data from <br />
                    Jan 03 , 2022 to  FEB 02, 2022
                  </p>

                </div> */}
            </div>



            {/* static data currently commited  */}

            {
              /*
                <div className='hm-analyze'>
                  <div className='hm-ana-img'><img src={analyze} alt="analyze img" /></div>
                  <div className='hm-an-con'>
                    <h3>
                      Analyze your competitors SEO and get new opportinities to increase SEO Score
                    </h3>
                  </div>
                  <div className='hm-an-cm'>
                    <p>Analyze competitors -</p>
                  </div>
                </div>
              */
            }

            <div className='d-none'> <RankTable /> </div>


            <div className='w-100 mt-5'>
              <h6>Top Keyword Ranking</h6>
              <DoughnutChartone />
            </div>


          </div>
        </div>

      </div >


      {
        deleteAlert ? <div className='pop'  >
          <div className='popBody'>
            <div className='exeMark'><h1>?</h1> </div>
            <h3>Are You Sure</h3>
            <p>You will not able to recover this Project ! </p>
            <div className='cmd' style={{ justifyContent: "space-evenly" }}>
              <button onClick={() => setdeleteAlert(false)} className='cm-btn-b'> Cancel</button>
              <button onMouseDown={() => Do_Project_Delete(allprojectDetails)} onMouseUp={() => setdeleteAlert(false)} className='cm-btn'> Delete</button>
            </div>
          </div>
        </div> : false
      }



    </div>
  )
}
export default Home;