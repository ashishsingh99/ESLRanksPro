import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Admin_Keyword_Get } from '../../services/constants';


const Keyword = () => {

    const allprojectdata = useSelector((state) => state.allprojectdata);

    useEffect(() => {
        axios.get(Admin_Keyword_Get())
            .then((res) => {
                console.log('res.data.data',res.data.data)
            })
    })



    return (
        <div>
            <div>
                <h2 className='table_title'>Keywords</h2>
                <table className="table">
                    <thead >
                        <tr>
                            <th scope="col" >
                                Keyword
                            </th>

                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allprojectdata.length !== 0 ? allprojectdata && allprojectdata.map((project, key) => {
                            return <tr key={key}>
                                <td>{project.keyword}</td>
                                <td className='table-edit'>  <i className=" fa-solid fa-trash"></i> </td>

                            </tr>

                        }) : 'loading'
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Keyword;