import React from 'react'
import Events from './Events'
import LearningEnvironment from './LearningEnvironment'
function WhatDoWeProvide() {
    return (
        <>
            <div className='md:flex items-start'>
                <div className="flex items-center justify-between md:w-6/12 mr-10 md:mr-0">
                    <span className='text-[#797877] text-[17px] hidden md:block md:w-4/12'>/SERVICE/</span>
                    <span className='text-[#797877] text-[17px] md:w-4/12 block md:hidden'>/00/</span>
                    <h2 className='text-[#262625] text-[43px] font-semibold hidden md:block w-10/12'>
                        What do we provide?
                    </h2>
                    <h3 className='text-[#262625] text-[24px] font-semibold xl:w-8/12 block md:hidden'> SERVICE
                    </h3>

                </div>
                <p className='md:w-6/12 text-[#797877] md:text-[23px] font-semibold mt-8'>
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