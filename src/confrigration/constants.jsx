import React, { useEffect } from "react";
import Get_Country from "./getCountry";
import GetCustomer from "./getCustomer";
import GetPreviousRanks from "./getPreviousRanks";
import GetProfile from "./getProfile";
import GetRanks from "./getRanks";
import { useSelector } from "react-redux";

const ManageData_Configure = () => {
    const loginOut = useSelector(state => state.loginout)
    // useEffect(() => {

    // })
    if (loginOut === true) {
        // alert('login succesfullly')
        return <>
            <GetCustomer />
            <GetProfile />
            <GetRanks />
            <GetPreviousRanks />
            <Get_Country />

        </>

    }

};

export default ManageData_Configure;
