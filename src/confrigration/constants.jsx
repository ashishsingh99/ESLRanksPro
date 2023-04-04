import React, { useEffect } from "react";
import Get_Country from "./getCountry";
import GetCustomer from "./getCustomer";
import GetPreviousRanks from "./getPreviousRanks";
import GetProfile from "./getProfile";
import GetRanks from "./getRanks";
import GetAllAverageRanks from "./getAllAverageRanks";

const ManageData_Configure = () => {
    const loginOut = localStorage.getItem('loginOut')
    // useEffect(() => {

    // })
    if (loginOut === 'true') {
        // alert('login succesfullly')
        return <>
            <GetCustomer />
            <GetProfile />
            <GetRanks />
            <GetPreviousRanks />
            <Get_Country />
            <GetAllAverageRanks />
        </>

    }

};

export default ManageData_Configure;
