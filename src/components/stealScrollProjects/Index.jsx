import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Destinations from "./Destinations";
import ProjectCard from "./ProjectCard";

const Index = () => {
  return <HorizontalScrollCarousel />;
};

const projects = [
  {
    projectTitle: "GSM Phone",
    projectAuthor: "Yasser Boudahdir",
    projectImg: "gsmPhone.jpg",
  },
  {
    projectTitle: "Joystick Controlled Robotic Arm",
    projectAuthor: "Amer Marouche",
    projectImg: "CV Powered Robotic Arm.png",
  },
  {
    projectTitle: "Solar Following Robot",
    projectAuthor: "Youcef Boubidi",
    projectImg: "crypto.png",
  },
  {
    projectTitle: "Mini CNC Plotter",
    projectAuthor: "Oussama Bouyahiaoui",
    projectImg: "miniCnc.jpg",
  },
  {
    projectTitle: "Cryptocurrency tracker with the GIGA Display Shield",
    projectAuthor: "Youcef Boubidi",
    projectImg: "crypto.png",
  },
];

// Custom hook using matchMedia (always safe to use useEffect here)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(max-width: 767px)");
      setIsMobile(mediaQuery.matches);
      const handler = (event) => setIsMobile(event.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  return isMobile;
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const [count, setCount] = useState(0);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({ target: targetRef });

  // Always call these hooks, regardless of mobile or not.
  const transformX = useTransform(scrollYProgress, [0, 1], ["3%", "95%"]);
  const transformX2 = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const transformRotate = useTransform(scrollYProgress, [0, 1], [0, 1440]);
  const transformProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Conditionally use the hook values
  const x = isMobile ? 0 : transformX;
  const x2 = isMobile ? 0 : transformX2;
  const rotate = isMobile ? 0 : transformRotate;
  const progress = isMobile ? 0 : transformProgress;

  return (
    <section ref={targetRef} className={`relative ${isMobile ? "h-auto" : "h-[400vh]"}`}>
      <div className={`sticky top-0 flex ${isMobile ? "flex-col" : "h-screen w-full"}`}>
        {/* Progress Bar */}
        <div className="bg-[#e9e8e4] relative overflow-hidden border border-white h-7 flex items-center mt-12 w-full mx-10 p-1 rounded-full">
          <motion.div
            style={{ x }}
            transition={{ ease: "easeOut", duration: 100 }}
            className="w-full flex justify-end absolute right-full p-2 rounded-xl bg-[#262625]"
          >
            <motion.div style={{ rotate }} className="z-10 bg-white text-black flex items-center justify-center w-4 h-4 rounded-full">
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

        {/* Progress Percentage (only desktop) */}
        {!isMobile && (
          <motion.p
            style={{ scrollYProgress }}
            className="text-[#b5b5b5] font-bold right-12 top-28 absolute hidden md:block"
            onUpdate={() =>
              setCount(
                progress.current < 50 ? Math.floor(progress.current) : Math.ceil(progress.current)
              )
            }
          >
            <span className="hidden md:block">PROGRESS</span>{" "}
            <span className="text-black font-medium">{count}%</span>
          </motion.p>
        )}

        <Destinations className="gap-3 absolute top-28 left-12 hidden md:flex" count={count} type="Eventssas" />

        <div
          className={`absolute left-0 top-20 w-full ${isMobile ? "h-auto relative" : "h-[88vh]"
            } flex items-center justify-start overflow-hidden`}
        >
          <Projects style={{ x: x2 }} />
        </div>
      </div>
    </section>
  );
};

const Projects = ({ ...attributes }) => {
  return (
    <>
      {/* Desktop: Horizontal Carousel */}
      <motion.div className="hidden md:flex flex-shrink-0 gap-16 pr-16 min-w-max" {...attributes}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 50, delay: index * 0.1 },
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

      {/* Mobile: Vertical List */}
      <div className="md:hidden flex flex-col gap-4 px-4 py-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 50, delay: index * 0.1 },
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
