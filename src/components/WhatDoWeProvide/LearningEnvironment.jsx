import React from 'react'

function LearningEnvironment({ ...attributes }) {
    const listItems = {
        "Events": [
            ["I", "II", "III", "IV"],
            [
                "Access to everything Electronics",
                "Passionate mentors",
                "Friendly and fun environment",
                "Opportunities to work on real-world projects"
            ]
        ]
    }
    return (
        <div {...attributes}>
            <div className="md:flex items-start">
                <div className="flex items-center justify-between md:w-6/12 mr-10 md:mr-0">
                    <span className='text-[#797877] text-[17px] md:w-4/12'>/02/</span>
                    <h3 className='text-[#262625] text-xl font-semibold w-8/12'> LEARNING ENVIRONMENT
                    </h3>
                </div>
                <div className="md:w-6/12 md:text-lg font-semibold">
                    <h4 className='text-[#80a4ad] mb-8 mt-4'>Highly energetic, safe, and passionate space</h4>
                    <p className='text-[#686868] mb-8'>
                        We offer a space filled with passion, motivation, and energy!
                        <br />
                        Limited by your environment? Lacking equipment? We offer a solution to that. We offer our members unlimited access to the club roomn at the Faculty of Technology in Boumerdes. <span> <a href="https://www.google.com/maps/place/M'hamed+Bougara+University+of+Boumerdes+-+Faculty+of+Technology/@36.7587678,3.4556404,14.88z/data=!4m6!3m5!1s0x128e68590282d863:0x896d1bbf8bb142d8!8m2!3d36.761164!4d3.4577235!16s%2Fg%2F1tfdts7z?entry=ttu&g_ep=EgoyMDI1MDIyNS4wIKXMDSoASAFQAw%3D%3D" className='hover:underline hover:text-[#222222] text-[#444444]'> (click here for exact location).</a></span>
                    </p>
                    <ul className="space-y-6">
                        {listItems.Events[1].map((item, index) => (<>
                            <li className='flex text-[#262625]'>
                                <span className='w-1/6'>{listItems.Events[0][index]}</span>
                                <h4>{item}</h4>
                            </li>
                            {listItems.Events[1].length - 1 > index && <hr className='border-1 border-[#797979]' />}
                        </>

                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LearningEnvironment