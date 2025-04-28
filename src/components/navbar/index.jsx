import { motion } from "framer-motion";
import { useRef, useState } from "react";
export default function Navbar() {
  return (
    <div className="fixed z-50 bottom-3 left-1/2 -translate-x-1/2 ">
      <SlideTabs />
    </div>
  );
}

const SlideTabs = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: "97px",
    opacity: 1,
  });
  return (
    <ul className="relative mx-auto flex w-fit rounded-full border border-Text3 bg-white  ">
      <Tab setPosition={setPosition} href="#header">
        Home &nbsp;
      </Tab>
      <Tab setPosition={setPosition} href="#moreInfo">
        Info
      </Tab>
      <Tab setPosition={setPosition} href="#events">
        Events
      </Tab>
      <Tab setPosition={setPosition} href="#communityDiscord">
        Discord
      </Tab>
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ href, children, setPosition, ...attributes }) => {
  const ref = useRef(null);

  function handleClick(e) {
    e.preventDefault(); // Stop the default jump

    const target = document.querySelector(href);
    if (target.id === "events") {
      const rect = target.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const offset = 160; // <-- you can adjust this value (in pixels)

      window.scrollTo({
        top: rect.top + scrollTop + offset,
        behavior: "smooth",
      });
    } else if (target.id === "header") {
      const rect = target.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const offset = 70; // <-- you can adjust this value (in pixels)

      window.scrollTo({
        top: rect.top + scrollTop - offset,
        behavior: "smooth",
      });
    } else if (target.id === "moreInfo") {
      const rect = target.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const offset = 70; // <-- you can adjust this value (in pixels)

      window.scrollTo({
        top: rect.top + scrollTop + offset,
        behavior: "smooth",
      });
    } else {
      const rect = target.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      window.scrollTo({
        top: rect.top + scrollTop,
        behavior: "instant",
      });
    }
  }
  return (
    <a
      ref={ref}
      href={href}
      {...attributes}
      onClick={handleClick}
      onMouseEnter={(e) => {
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base "
    >
      {children}
    </a>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        x: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{ type: "tween", duration: 0.2 }}
      className="absolute z-0 h-7  rounded-full bg-black md:h-12"
    ></motion.li>
  );
};
