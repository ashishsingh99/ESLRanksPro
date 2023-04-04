import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ADMIN_USERS, delete_User } from '../../services/constants';

const User = () => {
    const [Users, setUsers] = useState([0]);
    const [UserId, setUserId] = useState(null);
    const [ShowAlert, setShowAlert] = useState(false);

    const deleteUser = () => {
        axios.delete(delete_User(UserId  ))
            .then(() => {
                setShowAlert(false)
                setUserId(null)
            })
    }

    useEffect(() => {
        axios.get(ADMIN_USERS())
            .then((res) => {
                const data = res.data
                // console.log('adminUser', res.data)
                setUsers(data)

            });
    }, [ShowAlert, UserId])

    const showAlert = (e) => {
        setShowAlert(true)
        setUserId(e)
    }
    return (
        <div>
            <div>
                <h2 className='table_title'>Users</h2>
                <table className="table">
                    <thead >
                        <tr>
                            <th scope="col" > Name  </th>
                            <th scope="col" > Email  </th>
                            <th scope="col" > Created  </th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Users.map((user, key) => {
                                return <tr key={key}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td className='table-edit'>
                                        {/* <i className='fa-solid fa-edit'></i> */}
                                        <span onClick={() => showAlert(user.id)}><i className=" fa-solid fa-trash" ></i> </span>
                                    </td>

                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>


            {
                ShowAlert ? <div className='pop' onClick={() => setShowAlert(false)}  >
                    <div className='popBody'>
                        <div className='exeMark'><h1>?</h1> </div>
                        <h3>Are You Sure</h3>
                        <p>you will not able to recover this User  </p>
                        <div className='cmd' style={{ justifyContent: "space-evenly" }}><button onClick={() => setShowAlert(false)} className='cm-btn-b'> Cancel</button><button onClick={() => deleteUser(UserId)} className='cm-btn'> Delete</button></div>
                    </div>
                </div> : false
            }

        </div>
    )
}

export default User;