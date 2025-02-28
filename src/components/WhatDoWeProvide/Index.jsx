import React from 'react'
import Events from './Events'
import LearningEnvironment from './LearningEnvironment'
function WhatDoWeProvide() {
    return (
        <>
            <div className='xl:flex items-start'>
                <div className="flex items-center justify-between xl:w-6/12 mr-10 xl:mr-0">
                    <span className='text-[#797877] text-[17px] xl:w-4/12'>/00/</span>
                    <h1 className="xl:w-5/12 font-semibold text-[#262525] xl:text-[39px] text-xl xl:mb-0">
                        What do we provide?
                    </h1>
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