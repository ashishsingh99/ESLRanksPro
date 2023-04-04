import React from 'react'
import { curday, perday } from '../upDater/constant';

const LastUpdate = () => {
    return (
        <div>
            <div className='cmd lastUpdate'>
                <div>
                    <select>
                        <option>
                            Last Month
                        </option>
                    </select>
                    <span className='hm-b2-sp'> {curday()} - {perday()} </span>
                </div>

                <div>
                    <div className='text-end'>Last Updated :  <br /></div>
                    <span className='hm-b2-sp'> {curday()} 2:00 AM</span>
                </div>
            </div>
        </div>
    )
}

export default LastUpdate;