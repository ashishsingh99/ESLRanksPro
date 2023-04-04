import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { profile_withApi } from '../services/constants';

const GetProfile = () => {
    const token = localStorage.getItem("token");

    useEffect(() => {
        let Headers = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        axios.get(profile_withApi(), Headers).then((res) => {
            localStorage.setItem('name', res.data.name)
        });
    },[]);

}

export default GetProfile;