import { Routes, Route } from "react-router-dom";
import Login from '../Mycomponent/pages/login/login';
import Layout from '../Layout';
import Home from '../Mycomponent/pages';
import RankTracking from '../Mycomponent/pages/rankTracking';
import Register from '../Mycomponent/pages/login/register';
import PlLogin from '../Mycomponent/pages/login/plLogin';
import AddProject from '../Mycomponent/pages/AddProject/addProject';
import { AddWebsite } from '../Mycomponent/pages/AddProject/addwebsite';
import { AddCountry } from '../Mycomponent/pages/AddProject/addLocation';
import { AddKeyword } from '../Mycomponent/pages/AddProject/addKeyword';
import Upgrade from '../Mycomponent/pages/upgrade';
import Forgot from '../Mycomponent/pages/login/forgot';
import Keywords from '../Mycomponent/pages/keywords';
import NoPage from '../Mycomponent/pages/login/noPage';
import Profile from '../Mycomponent/pages/profile';
import GrowTraffic from '../Mycomponent/pages/AddProject/growTraffic';
import { addcountry, addkeyword, addpr, addwebsite, admin, adminkeyword, backlinks, codes, dashboard, forgot, gotraffic, home, keywords, login, nopage, path, plans, pllogin, profile, rank, register, siteaudit, traffic, upgrade, users } from "./constant";
import Admin from "../admin/admin";
import User from "../admin/pages/user";
import Keyword from "../admin/pages/keyword";
import Plans from "../admin/pages/plans";
import Codes from "../admin/pages/codes";
import Siteaudit from "../Mycomponent/pages/siteaudit";
import Traffic from "../Mycomponent/pages/traffic";
import BackLinks from "../Mycomponent/pages/backLinks";
import Dashboard from "../admin/pages/dashboard";



const RouterConfrigration = () => {

    return (
        <Routes>
            <Route path={nopage} element={<NoPage />} />
            <Route path={login} element={<Login />} />
            <Route path={pllogin} element={<PlLogin />} />
            <Route path={register} element={<Register />} />
            <Route path={path} element={<Forgot />} />
            <Route path={forgot} element={<Forgot />} />

            <Route path={home} element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={upgrade} element={<Upgrade />} />
                <Route path={profile} element={<Profile />} />
                <Route path={rank} element={<RankTracking />} />
                <Route path={siteaudit} element={<Siteaudit />} />
                <Route path={traffic} element={<Traffic />} />
                <Route path={backlinks} element={<BackLinks />} />
                <Route path={keywords} element={<Keywords />} />
                <Route path={addpr} element={<AddProject />} >
                    <Route index element={<AddWebsite />} />
                    <Route path={addwebsite} element={<AddWebsite />} />
                    <Route path={addcountry} element={<AddCountry />} />
                    <Route path={addkeyword} element={<AddKeyword />} />
                    <Route path={gotraffic} element={<GrowTraffic />} />
                </Route>
            </Route>

            <Route path={admin} element={<Admin />}>
                <Route index element={<User />} />
                <Route path={dashboard} element={<Dashboard />} />
                <Route path={users} element={<User />} />
                <Route path={adminkeyword} element={<Keyword />} />
                <Route path={plans} element={<Plans />} />
                <Route path={codes} element={<Codes />} />
            </Route>
        </Routes>
    )
}

export default RouterConfrigration;