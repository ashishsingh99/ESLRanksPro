import React from 'react';
import PlLogin from './login/plLogin';
import '../css/rankTracking.css';
import { Link } from 'react-router-dom';
import RankTable from '../share/tables/RankTable';
import ProjectList from '../share/searchBox/ProjectList';
import RippleButton from '../share/components/rippleButton';
import AverageChart from '../share/charts/AverageRank';
import LastUpdate from '../share/components/lastUpdate';
import { useDispatch, useSelector } from 'react-redux';
import PlAdd from './login/plAdd';
import ProjectLocation from '../share/searchBox/ProjectLocation';
import AutoSearch from '../share/searchBox/autoSearch';



const RankTracking = () => {
  const dispatch = useDispatch();

  // redux data
  const loginOut = useSelector(state => state.loginout)
  const isProject = useSelector(state => state.isproject)


  // Ranking Body
  if (loginOut === true) {
    return (
      <>
        {isProject === true ?
          <div className='rank-main'>
            <div className='cmd-b'>
              <div className='d-flex' style={{ alignItems: 'center' }}>
                <ProjectList />
                <div className='sel-cus-date'>
                  <select onChange={(e) => dispatch({ type: "SELECTCUSTOMDATE", payload: Number(e.target.value) })}>
                    <option value={7}>Last 1 Week</option>
                    <option value={30}>Last 30 Days</option>
                    <option value={90}>Last 3 Month</option>
                    <option value={180}>Last 6 Month</option>
                    <option value={365}>Last 1 Year</option>
                  </select>
                </div>
                <ProjectLocation />

                <Link to='/addpr'>  <RippleButton>    +  Add Project  </RippleButton></Link>
              </div>

              <div className='rank-se'>

                {/* <button className='cm-btn ms-3'>Search</button> */}
                <AutoSearch />
              </div>
            </div>

            <div>
              {/* <div className='cmd-b'>
            <div className='w-100'>
              <h6>Top Keyword Ranking</h6>
              <DoughnutChartone />
            </div>
          </div> */}


              <div className='cmd-b'>
                <div className='d-block w-100' >
                  <LastUpdate />
                  {/* static data currently commited  */}
                  <div className='se-vol'>
                    <div>  Average Rank</div>
                    {/* <div><span><i className='fa-solid fa-box'></i> Desktop</span> <span className='ms-5'> <i className='fa-solid fa-box' style={{ color: '#FF6384' }}></i> Mobile</span></div> */}
                  </div>
                  <div>
                    <div className='row'>
                      {/* <div className='col-6'> <LineChart /></div> */}
                      <div className='col-md-6 col-12'><AverageChart /></div>
                    </div>
                  </div>

                  <RankTable />

                </div>
              </div>

            </div>

          </div >
          : <PlAdd />
        }
      </>
    )
  }
  else {
    return <PlLogin />
  }

}

export default RankTracking;