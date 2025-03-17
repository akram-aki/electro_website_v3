import React from 'react';

const ScrollingBanner = () => {
    return (
        <a href='/electrobot-rumble'>
            <div className="w-full h-8 overflow-hidden bg-[#70a939] flex items-center" href='/'>
                <div
                    className="whitespace-nowrap text-white font-bold"
                    style={{ animation: 'marquee 15s linear infinite' }}
                >
                    ELECTROBOT REGISTRATIONS ARE OPEN - REGISTER NOW! - ELECTROBOT REGISTRATIONS ARE OPEN - REGISTER NOW! -
                </div>
            </div>
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
        </a>
    );
};

export default ScrollingBanner;
