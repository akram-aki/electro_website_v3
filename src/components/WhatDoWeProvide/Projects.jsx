import React from 'react'

function Projects({ ...attributes }) {
    const listItems = {
        "Projects": [
            ["I", "II", "III", "IV"],
            [
                "Smart Home Automation",
                "AI Chatbot",
                "Robotics Arm",
                "Custom PCB Design"
            ]
        ]
    }
    return (<div {...attributes}>

        <div className="xl:flex items-start">
            <div className="flex items-center justify-between xl:w-6/12 mr-10 xl:mr-0">
                <span className='text-[#797877] text-[17px] xl:w-4/12'>/03/</span>
                <h3 className='text-[#262625] text-[24px] font-semibold xl:w-8/12'> PROJECTS
                </h3>
            </div>
            <div className="xl:w-6/12 xl:text-[23px] font-semibold">
                <h4 className='text-[#9F8787] mb-8 mt-4'>Innovative, challenging, and skill-enhancing projects</h4>
                <p className='text-[#797877] mb-8'>
                    Our members collaborate on various projects, from AI-driven applications to hardware innovations.
                    These projects help enhance technical skills, encourage teamwork, and contribute to real-world problem-solving.
                </p>
                <ul className="space-y-6">
                    {listItems.Projects[1].map((item, index) => (<>
                        <li className='flex text-[#262625]'>
                            <span className='w-1/6'>{listItems.Projects[0][index]}</span>
                            <h4>{item}</h4>
                        </li>
                        {listItems.Projects[1].length - 1 > index && <hr className='border-1 border-[#797979]' />}
                    </>
                    ))}
                </ul>
            </div>
        </div>
    </div >
    )
}

export default Projects
