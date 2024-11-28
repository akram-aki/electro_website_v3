import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const Example = () => {
  return (
    <div className="bg-neutral-800 ">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["20%", "80%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  return (
    <section
      ref={targetRef}
      className="relative h-[300vh] w-screen  bg-neutral-900"
    >
      <div className="sticky top-0 flex h-screen overflow-hidden w-full ">
        <div className="bg-white  h-14 flex items-center mt-20 w-screen mx-10 p-1 rounded-full">
          <motion.div
            style={{
              x,
            }}
            transition={{ ease: "easeOut", duration: 9 }}
            className="w-full"
          >
            <motion.div
              style={{
                rotate,
              }}
              className="bg-black flex items-center justify-center w-10 h-10 rounded-full text-white"
            >
              hi
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Example;
