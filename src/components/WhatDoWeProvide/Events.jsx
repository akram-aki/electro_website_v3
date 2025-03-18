import React from 'react'

function Events({ ...attributes }) {
    const listItems = {
        "Events": [
            ["I", "II", "III", "IV"],
            [
                "Arduino Workshop",
                "Welcome Day",
                "Outside Visits",
                "Chess Competitions"
            ]
        ]
    }
    return (<div {...attributes}>

        <div className="md:flex items-start">
            <div className="flex items-center justify-between md:w-6/12 mr-10 md:mr-0">
                <span className='text-[#797877] text-[17px] md:w-4/12'>/01/</span>
                <h3 className='text-[#262625] text-xl font-semibold md:w-8/12'> EVENTS
                </h3>
            </div>
            <div className="md:w-6/12 md:text-lg font-semibold">
                <h4 className='text-[#9F8787] mb-8 mt-4'>Informative, fun, and career-building events</h4>
                <p className='text-[#797877] mb-8'>
                    We very often host events that include workshops, outside visits, exhibitions, internships, and much more;
                    We aim to provide with the help of our members events that benefit attendees in more than one way.
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
    </div >
    )
}

export default Events