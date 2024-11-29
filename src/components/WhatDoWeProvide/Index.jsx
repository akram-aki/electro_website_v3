import React from 'react'
import Events from './Events'
import LearningEnvironment from './LearningEnvironment'
function WhatDoWeProvide() {
    return (
        <>
            <div className='flex items-start'>
                <div className='flex items-center w-6/12'>
                    <span className='text-[#797877] text-[17px] w-2/12'>/SERVICE/</span>
                    <h2 className='text-[#262625] text-[43px] font-semibold w-10/12'>
                        What do we provide?
                    </h2>
                </div>
                <div className='w-1/12' />
                <p className='w-5/12 text-[#797877] text-[23px] font-semibold'>
                    Our purpose is to provide an appropriate environment for all passionate, creative, motivated and talented students.
                    Meet us now at the University of Boumerdes or at the dozens of events and workshops throughout the year.

                    Every event and project is unique, and we pour our hearts into everything we provide.
                </p>
            </div>
            <hr className='border-1 border-[#262625] my-16' />
            <Events />
            <hr className='border-1 border-[#262625] my-16' />
            <LearningEnvironment />
            <hr className='border-1 border-[#262625] my-16' />

        </>
    )
}

export default WhatDoWeProvide