import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Admin_Keyword_Get } from '../../services/constants';


const Keyword = () => {

    const [keyword, setKeyword] = useState([])

    useEffect(() => {
        axios.get(Admin_Keyword_Get())
            .then((res) => {
                console.log('res.data.data', res.data.data)
                setKeyword(res.data.data)
            })
    }, [keyword])



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
                            <th scope="col" >
                                Device
                            </th>
                            <th scope="col" >
                                Location Code
                            </th>

                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {keyword.length !== 0 ? keyword && keyword.map((project, key) => {
                            return project.data && project.data.map((keywo, key) => {
                                return <tr key={key}>
                                    <td>{keywo.keyword}</td>
                                    <td>{keywo.device}</td>
                                    <td>{keywo.location_code}</td>
                                    <td className='table-edit'>  <i className=" fa-solid fa-trash"></i> </td>

                                </tr>

                            })
                        }) : 'loading'
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Keyword;