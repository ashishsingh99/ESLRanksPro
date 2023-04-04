import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import ManageData_Configure from './confrigration/constants';
import Header from './Mycomponent/share/header';
import Loader from './Mycomponent/share/loader';

const Layout = () => {
    // redux dispatecher
    const dispatch = useDispatch();

    // redux state data
    const loading = useSelector(state => state.loading);

    // after 2 seconds stops
    const timerId = setInterval(() => dispatch({ type: 'NOTLOADING' }), 1000);
    setTimeout(() => { clearInterval(timerId) }, 1000);

    return (
        <div>
            <ManageData_Configure />
            <div className={loading ? 'loading-skeleton hm-page' : 'hm-page'} >
                <Header />
                <div className='layout_outlet' >
                    <Outlet />

                </div>
            </div>
            {loading ? <Loader /> : <div></div>}

        </div>
    );
}

export default Layout;