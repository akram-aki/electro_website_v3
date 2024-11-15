import React from 'react';
import DownIcon from '../assets/DownIcon.svg'; // Adjust the path as necessary

function Hero() {
    return (
        <div className='flex'>
            <h1 className='w-7/12 font-bold text-[60px]'>
                We are a quick-growing community of highly passionate and motivated members.
            </h1>
            <div className='w-1/12' />
            <div className='flex flex-col w-5/12 text-[22px]'>
                <p className='uppercase text-[#4F4F4D]'>
                    <span className='text-[#96C390]'> ELECTRO CLUB</span> IS A student-driven space at the university of boumerdes, algeria.
                    founded in 2011, we exceed at hosting events, sharing our passion with members, and showcasing our ELECTRONICS CREATIONS.
                </p>
                <div className='flex mt-auto'>
                    <img src={DownIcon} alt="Down Icon" />
                    <span className='ml-8 font-bold'>Check us Out</span>
                </div>
            </div>
        </div>
    );
}

export default Hero;