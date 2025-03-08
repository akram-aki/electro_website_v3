import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import Destinations from "./Destinations";
import ProjectCard from "./ProjectCard";
const Index = () => {
  return <HorizontalScrollCarousel />;
};
const projects2 = [
  {
    projectTitle: "Bluetooth-Controlled Car with HC-05 Module",
    projectAuthor: "Youcef Boubidi",
    projectImgs: ["imgLink1, imgLink2, etc."],
    projectCode: "code here",
    projectDocumentation: ""
  }
]
const projects = [
  {
    projectTitle: "Bluetooth-Controlled Car with HC-05 Module",
    projectAuthor: "Youcef Boubidi",
    projectImg: "arduinoCar.png"
  },
  {
    projectTitle: "Smart Plant Watering with Arduino IOT Cloud",
    projectAuthor: "Youcef Boubidi",
    projectImg: "smartPlantWatering.png"
  },
  {
    projectTitle: "Cryptocurrency tracker with the GIGA Display Shield",
    projectAuthor: "Youcef Boubidi",
    projectImg: "crypto.png"
  },
  {
    projectTitle: "Bluetooth-Controlled Car with HC-05 Module",
    projectAuthor: "Youcef Boubidi",
    projectImg: "arduinoCar.png"
  },
  {
    projectTitle: "Smart Plant Watering with Arduino IOT Cloud",
    projectAuthor: "Youcef Boubidi",
    projectImg: "smartPlantWatering.png"
  },
  {
    projectTitle: "Cryptocurrency tracker with the GIGA Display Shield",
    projectAuthor: "Youcef Boubidi",
    projectImg: "crypto.png"
  },

]

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const [count, setCount] = useState(0);
  const { scrollYProgress } = useScroll({
    target: targetRef,

  });

  const x = useTransform(scrollYProgress, [0, 1], ["3%", "95%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1440]);
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return (
    <section ref={targetRef} className="relative h-[400vh]">
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
          <span className="hidden md:block">PROGRESS</span> <span className="text-black font-medium">{count}% </span>
        </motion.p>
        <Destinations
          className="flex gap-3 absolute  top-28 left-12"
          count={count}
          type="Eventssas"
        />
        <div className="absolute left-0 top-28 w-full h-[88vh] flex items-center justify-start overflow-hidden">
          <Projects style={{ x: x2 }} />
        </div>
      </div>
    </section>
  );

};
const Projects = ({ ...attributes }) => {
  return (
    <>
      <motion.div
        className="hidden md:flex flex-shrink-0 gap-16 pr-16 min-w-max"
        {...attributes}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 50,
                delay: index * 0.1,
              },
            }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-shrink-0"
          >
            <ProjectCard
              projectImg={project.projectImg}
              projectAuthor={project.projectAuthor}
              projectTitle={project.projectTitle}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="md:hidden flex flex-col gap-4 px-4 py-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 50,
                delay: index * 0.1,
              },
            }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ProjectCard
              projectImg={project.projectImg}
              projectAuthor={project.projectAuthor}
              projectTitle={project.projectTitle}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Index;
