import React from 'react'
import Events from './Events'
import LearningEnvironment from './LearningEnvironment'
function WhatDoWeProvide() {
    return (
        <>
            <div className='xl:flex items-start'>
                <div className='flex items-center justify-between xl:w-6/12 mr-10'>
                    <span className='text-[#797877] text-[17px] xl:w-2/12'>/SERVICE/</span>
                    <h2 className='text-[#262625] xl:text-[43px] text-2xl font-semibold xl:w-10/12 ml-auto'>
                        What do we provide?
                    </h2>
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