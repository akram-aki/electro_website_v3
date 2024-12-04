import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import Destinations from "./Destinations";
import Items from "./Items";
const Index = () => {
  return <HorizontalScrollCarousel />;
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const [count, setCount] = useState(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["3%", "100%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1440]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return (
    <section ref={targetRef} className="relative h-[900vh]   ">
      <div className="sticky  top-0 flex h-screen  w-full ">
        <div className="bg-[#e9e8e4] relative overflow-hidden border border-white h-7 flex items-center mt-20 w-full mx-10 p-1 rounded-full">
          <motion.div
            style={{
              x,
            }}
            transition={{ ease: "easeOut", duration: 100 }}
            className="w-full flex justify-end absolute right-full p-2 rounded-xl   bg-[#262625] "
          >
            <motion.div
              style={{
                rotate,
              }}
              className=" z-10  bg-white text-black flex items-center justify-center w-4 h-4 rounded-full "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
        <motion.p
          ref={targetRef}
          style={{ scrollYProgress }}
          className="text-[#b5b5b5]  font-bold  right-12 top-28 absolute"
          onUpdate={() =>
            setCount(() =>
              progress.current < 50
                ? Math.floor(progress.current)
                : Math.ceil(progress.current)
            )
          }
        >
          {" "}
          PROGRESS <span className="text-black font-medium">{count}% </span>
        </motion.p>
        <Destinations
          className="flex gap-3 absolute  top-28 left-12"
          count={count}
        />
        <Items
          count={Math.floor(count / 25)}
          className="grid grid-cols-[2fr_1fr] gap-20 border-2 border-white bg-Background w-[93%] rounded-xl h-[400px] absolute left-1/2 top-[60vh] -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </section>
  );
};

export default Index;
