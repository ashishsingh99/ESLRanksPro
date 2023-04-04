import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { delete_Plan, get_Plans_Details, post_Plans_Details, update_plans_Details } from '../../services/constants'

const Plans = () => {
    // state manage
    const [planDetails, setPlanDetails] = useState()

    const [ShowAlert, setShowAlert] = useState(false)
    const [deleteAlert, setdeleteAlert] = useState(false)
    const [updateAlert, setUpdateAlert] = useState(false)
    const [planId, setPlanId] = useState(null)

    const [price, setPrice] = useState(null)
    const [name, setName] = useState('individual')
    const [productId, setProductId] = useState(null)
    const [link, setLink] = useState(null)
    const [projlmt, setProjLmt] = useState(0)
    const [keyLmt, setKeyLmt] = useState(0)
    const [validityFor, setValidityFor] = useState('month')

    useEffect(() => {
        axios.get(get_Plans_Details())
            .then((res) => {
                // console.log('res get', res.data.data)
                setPlanDetails(res.data.data)
            })
    }, [deleteAlert, ShowAlert, planId, updateAlert])


    const AddPlan = () => {
        setShowAlert(true)
    }
    const DeleteAlert = (e) => {
        setdeleteAlert(true)
        setPlanId(e)
    }

    const DeletePlan = () => {
        axios.delete(delete_Plan(planId))
        setdeleteAlert(false)
    }

    const UpdateAlert = (e) => {
        setUpdateAlert(true)
        setPlanId(e)
    }

    const PlansHandler = () => {
        const data = {
            price: price,
            prod_id: productId,
            payment_link: link,
            name: name,
            validity: validityFor,
            proj_len: projlmt,
            keyword_len: keyLmt
        }

        if (ShowAlert === true) {
            axios.post(post_Plans_Details(), data)
                .then(() => {
                    // console.log(price, name, productId, link, validityFor)
                    setShowAlert(false)

                })
        }
        else if (updateAlert === true) {
            axios.put(update_plans_Details(planId), data)
                .then(() => {
                    setUpdateAlert(false)

                })
        }

    }
    return (
        <div>
            <div>

                <div className='cmd'>
                    <div> <h2 className='table_title'>Plans</h2></div>
                    <div><button className='cm-btn' onClick={() => AddPlan()}> + Add Plan</button></div>
                </div>
                <table className="table">
                    <thead >
                        <tr>
                            <th scope="col" >Name</th>
                            <th scope="col">Price </th>
                            <th scope="col">Product Id </th>
                            <th scope="col">Project lgth </th>
                            <th scope="col">Keyword lgth </th>

                            <th scope="col">Payment Link </th>
                            <th scope="col">Validity </th>
                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            planDetails && planDetails.map((plan, index) => {
                                return <tr key={index}>
                                    <td>{plan.name}</td>
                                    <td>{plan.price}</td>
                                    <td>{plan.prod_id}</td>
                                    <td>{plan.proj_len}</td>
                                    <td>{plan.keyword_len}</td>
                                    <td className="tb-link-lmt">{plan.payment_link}</td>
                                    <td>{plan.validity}</td>
                                    <td className='table-edit'><span onClick={() => UpdateAlert(plan.id)}> <i className='fa-solid fa-edit'></i> </span> <span onClick={() => DeleteAlert(plan.id)}><i className=" fa-solid fa-trash"></i></span> </td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>


            {/* delete plan popup  */}
            {
                deleteAlert ? <div className='pop'  >
                    <div className='popBody'>
                        <div className='exeMark'><h1>?</h1> </div>
                        <h3>Are You Sure</h3>
                        <p>You will not able to recover this Plan ! </p>
                        <div className='cmd' style={{ justifyContent: "space-evenly" }}>
                            <button onClick={() => setdeleteAlert(false)} className='cm-btn-b'> Cancel</button>
                            <button onClick={() => DeletePlan()} className='cm-btn'> Delete</button>
                        </div>
                    </div>
                </div> : false
            }


            {/* pop up for add plan */}
            {
                ShowAlert ? <div className='pop ' >
                    <div className='popBody'>
                        {/* <div className='exeMark'><h1>?</h1> </div> */}
                        <h3>Add Plan </h3>
                        {/* <form> */}
                        <div className='pop-form'>
                            <div style={{ textAlign: 'left' }}>

                                <input type='Number' placeholder='Price' onChange={(e) => setPrice(e.target.value)} ></input>
                                <label id='lb'>$Price</label>
                                <input type='text' placeholder='Product Id' onChange={(e) => setProductId(e.target.value)} ></input>
                                <label id='lb'>Product Id</label>
                                <input type='url' placeholder='https://Payment Link ' onChange={(e) => setLink(e.target.value)} ></input>
                                <label id='lb'>Link</label>
                                <div className='row'>
                                    <div className="col-6">
                                        <input type='number' placeholder='project limit ' onChange={(e) => setProjLmt(e.target.value)} ></input>
                                        <label id='lb'>Project Lmt </label>
                                    </div>
                                    <div className="col-6">
                                        <input type='number' placeholder='keyword limit ' onChange={(e) => setKeyLmt(e.target.value)} ></input>
                                        <label id='lb'>Keyword Lmt</label>
                                    </div>
                                </div>
                                <div className='pop-select'>
                                    <select onChange={(e) => setName(e.target.value)}>
                                        <option value='individual'>Individual</option>
                                        <option value='business'>Business</option>
                                        <option value='enterprise'>enterprise</option>
                                    </select>
                                    <label id='lb'> Plan Name </label>

                                </div>

                                <div className='pop-select'>
                                    <select onChange={(e) => setValidityFor(e.target.value)}>
                                        <option value='month'>Month</option>
                                        <option value='yearly'>Yearly</option>
                                    </select>
                                    <label id='lb'>Validity For </label>

                                </div>



                            </div>
                        </div>

                        <div className='cmd'><button className='cm-btn-b' onClick={() => setShowAlert(false)}> Cancel</button><button className='cm-btn' onClick={() => PlansHandler()}>Submit</button></div>
                        {/* </form> */}
                    </div>
                </div> : false
            }


            {/* pop for update plan  */}
            {
                updateAlert ? <div className='pop ' >
                    <div className='popBody'>
                        {/* <div className='exeMark'><h1>?</h1> </div> */}
                        <h3>Update Plan </h3>
                        {/* <form> */}
                        <div className='pop-form'>
                            <div style={{ textAlign: 'left' }}>

                                <input type='Number' placeholder='Price' onChange={(e) => setPrice(e.target.value)} ></input>
                                <label id='lb'>$Price</label>
                                <input type='text' placeholder='Product Id' onChange={(e) => setProductId(e.target.value)} ></input>
                                <label id='lb'>Product Id</label>
                                <input type='url' placeholder='https://Payment Link ' onChange={(e) => setLink(e.target.value)} ></input>
                                <label id='lb'>Link</label>
                                <div className='row'>
                                    <div className="col-6">
                                        <input type='number' placeholder='project limit ' onChange={(e) => setProjLmt(e.target.value)} ></input>
                                        <label id='lb'>Project Lmt </label>
                                    </div>
                                    <div className="col-6">
                                        <input type='number' placeholder='keyword limit ' onChange={(e) => setKeyLmt(e.target.value)} ></input>
                                        <label id='lb'>Keyword Lmt</label>
                                    </div>
                                </div>

                                <div className='pop-select'>
                                    <select onChange={(e) => setName(e.target.value)}>
                                        <option value='individual'>Individual</option>
                                        <option value='business'>Business</option>
                                        <option value='enterprice'>EnterPrice</option>
                                    </select>
                                    <label id='lb'> Plan Name </label>

                                </div>

                                <div className='pop-select'>
                                    <select onChange={(e) => setValidityFor(e.target.value)}>
                                        <option value='month'>Month</option>
                                        <option value='yearly'>Yearly</option>
                                    </select>
                                    <label id='lb'>Validity For </label>

                                </div>
                            </div>
                        </div>

                        <div className='cmd'><button className='cm-btn-b' onClick={() => setUpdateAlert(false)}> Cancel</button><button className='cm-btn' onClick={() => PlansHandler()}>Update</button></div>
                        {/* </form> */}
                    </div>
                </div> : false
            }
        </div>
    )
}

export default Plans;







