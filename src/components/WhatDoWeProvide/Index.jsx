import React from 'react'
import Events from './Events'
import LearningEnvironment from './LearningEnvironment'
function WhatDoWeProvide() {
    return (
        <>
            <div className='xl:flex items-start'>
                <div className="flex items-center justify-between xl:w-6/12 mr-10 xl:mr-0">
                    <span className='text-[#797877] text-[17px] xl:w-4/12'>/01/</span>
                    <h3 className='text-[#262625] text-[24px] font-semibold xl:w-8/12'> What do we provide?
                    </h3>
                </div>
                <p className='xl:w-6/12 text-[#797877] xl:text-[23px] font-semibold mt-8'>
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