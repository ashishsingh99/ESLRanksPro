import React, { useState } from 'react'

const Codes = () => {
    const [ShowAlert, setShowAlert] = useState(false)
    const [name, setName] = useState('individual')
    const [genratelmt, setGenratelmt] = useState(0)
    const [keyLmt, setKeyLmt] = useState(0)
    const [validityFor, setValidityFor] = useState('month')
    const [code, setCode] = useState("");



    const CodesHandler = () => {


        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let newCodes = [];
        for (let i = 0; i < 50; i++) {
            let precode = "";
            for (let j = 0; j < 10; j++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                precode += characters[randomIndex];
            }
            newCodes.push(precode);
        }
        setCode(newCodes);

        if (Codes.length !== 0) {

        }

    }

    return (
        <div>
            <div>
                <div className='cmd'>
                    <div> <h2 className='table_title'>Codes</h2></div>
                    <div><button className='cm-btn' onClick={() => setShowAlert(true)}> Genrate Plan</button></div>
                </div>
                <table className="table">
                    <thead >
                        <tr>
                            <th scope="col" >
                                Codes
                            </th>
                            <th scope="col" >
                                Plan
                            </th>
                            <th scope="col" >
                                Validity
                            </th>

                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Best web devlopment company in india</td>
                            <td>Best web devlopment company in india</td>
                            <td>Best web devlopment company in india</td>
                            <td className='table-edit'> <i className='fa-solid fa-edit'></i> <i className=" fa-solid fa-trash"></i> </td>

                        </tr>


                    </tbody>
                </table>
            </div>



            {
                ShowAlert ? <div className='pop ' >
                    <div className='popBody'>
                        {/* <div className='exeMark'><h1>?</h1> </div> */}
                        <h3>Genrate Codes </h3>
                        {/* <form> */}
                        <div className='pop-form'>
                            <div style={{ textAlign: 'left' }}>
                                <div className='pop-select'>
                                    <select onChange={(e) => setName(e.target.value)}>
                                        <option value='individual'>Individual</option>
                                        <option value='business'>Business</option>
                                        <option value='enterprise'>enterprise</option>
                                    </select>
                                    <label id='lb'> Plan Name </label>

                                </div>


                                <input type='number' placeholder='Genrate limit - 10 , 20 ' onChange={(e) => setGenratelmt(e.target.value)} ></input>
                                <label id='lb'>Genrate lmt </label>




                                <div className='pop-select'>
                                    <select onChange={(e) => setValidityFor(e.target.value)}>
                                        <option value='7'>7 Days</option>
                                        <option value='15'>15 Days</option>
                                        <option value='30'>30 Days</option>
                                        <option value='lifetime'>Lifetime</option>

                                    </select>
                                    <label id='lb'>Validity For </label>

                                </div>



                            </div>
                        </div>

                        <div className='cmd'><button className='cm-btn-b' onClick={() => setShowAlert(false)}> Cancel</button><button className='cm-btn' onClick={() => CodesHandler()}>Submit</button></div>
                        {/* </form> */}
                    </div>
                </div> : false
            }
        </div >

    )
}

export default Codes;