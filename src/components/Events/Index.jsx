import React from 'react'
import StealScroll from "../stealScroll/Index";
import DownIcon from '../../assets/DownIcon.svg'
function Events() {
    return (
        <>
            <div className='flex items-end'>
                <div className="w-1/12" />
                <h1 className="w-5/12 font-semibold text-[#262525] text-[35px] mb-24">Events</h1>
                <div className="w-6/12">
                    <span className="font-semibold text-[#797979] text-[22px]">Check out the most notable events hosted by Electro Scientific Club</span>
                    <div className='flex mt-16'>
                        <img src={DownIcon} alt="Down Icon" />
                        <span className='ml-8 font-bold'>Check out the full timeline</span>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className="w-4/12" />
                <div className='w-8/12'>
                    <StealScroll />
                </div>
            </div>

        </>
    )
}

export default Events