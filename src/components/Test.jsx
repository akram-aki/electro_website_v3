import { useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Test = () => {
    const targetRef = useRef(null);
    const [count, setCount] = useState(0);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

    useEffect(() => {
        const a = progress.on("change", (latest) => setCount(latest));

        return () => a;
    }, [progress]);


    return (
        <section ref={targetRef} className="h-[200vh] relative bg-gray-500">
            <h1 className="bg-white">{count}</h1>
            <div className="sticky top-6">
                <div className="h-[40vh] w-full bg-red-500 "></div>
                <div className={`h-[40vh] w-full bg-blue-500 absolute`} style={{
                    top: `${100 - count}%`

                }}></div>
            </div>
        </section >
    );
};

export default Test;
