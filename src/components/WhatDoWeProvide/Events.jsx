import React from 'react'

function Events() {
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
    return (
        <>
            <div className="flex items-start">
                <div className="flex items-center w-6/12">
                    <span className='text-[#797877] text-[17px] w-4/12'>/01/</span>
                    <h3 className='text-[#262625] text-[24px] font-semibold w-8/12'> EVENTS
                    </h3>
                </div>
                <div className="w-6/12 text-[23px] font-semibold">
                    <h4 className='text-[#9F8787] mb-8'>Informative, fun, and career-building events</h4>
                    <p className='text-[#797877] mb-8'>
                        We very often host events that include workshops, outside visits, exhibitions, internships, and much more;
                        <hr/>
                        <hr/>
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
        </>
    )
}

export default Events