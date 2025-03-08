import { useRef } from "react";
import Events from './Events';
import LearningEnvironment from './LearningEnvironment';
import { motion, useTransform, useScroll } from "framer-motion";

const WhatDoWeProvide = () => {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: targetRef
    });

    const y = useTransform(scrollYProgress, [0, 1], ["65%", "0%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

    return (<>
        <div className='md:flex items-start'>
        </div>
        <hr className='border-1 border-[#262625] mt-16' />

        <section ref={targetRef} className="relative h-[200vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="relative w-full">
                    <motion.div
                        style={{
                            opacity: useTransform(scrollYProgress, [0, 1], [1, 0.9]),
                            scale
                        }}
                    >
                        <Events />
                        <hr className='border-1 border-[#262625] my-16' />
                    </motion.div>
                </div>

                <motion.div
                    className="absolute inset-0"
                    style={{
                        y,
                        opacity,
                        transition: "all 0.3 ease-out"
                    }}
                >
                    <LearningEnvironment className='bg-[#f4f4f2]' />
                </motion.div>
            </div>
        </section>
    </>)
}

export default WhatDoWeProvide