import React, { useState } from 'react';
import '../css/index.css';
import '../css/loader.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import RankTable from '../share/tables/RankTable';
import AutoSearch from '../share/searchBox/autoSearch';
import ProjectList from '../share/searchBox/ProjectList';
import RippleButton from '../share/components/rippleButton';
import { curday, perday } from '../share/upDater/constant';
import LastUpdate from '../share/components/lastUpdate';
import DoughnutChartone from '../share/charts/doughnutChart';
export const Home = () => {
  const RankMovedup = useSelector(state => state.rankmovedup)
  const RankMovedDown = useSelector(state => state.rankmoveddown)
  const loginOut = useSelector(state => state.loginOut)
  useEffect(() => {
    if (loginOut !== 'true') {
      window.location.href = 'http://127.0.0.1:5500/Esl%20SEO%20tool%20web/home.html'

    }
  })
  return (
    <div>
      <div className='hm-body'>
        <div className='cmd-b'>
          <div>
            <ProjectList />
            <Link to='/addpr'>  <RippleButton >    +  Add Project  </RippleButton></Link>
          </div>
          <AutoSearch />
        </div>

        {
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
                      <span>   Keywords Moved up </span>
                    </div>
                    <div className='hm-ng-18'>
                      <h2>
                        {/* {companyRank && companyRank[rankLength - 1] ? companyRank[rankLength - 1] : 0} */}
                        {RankMovedDown}
                      </h2>
                      <span>   Keywords moved down </span>
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

              {/* <RankTable /> */}


              <div className='w-100 mt-5'>
                <h6>Top Keyword Ranking</h6>
                <DoughnutChartone />
              </div>


            </div>
          </div>
        }
      </div >



    </div>
  )
}
export default Home;