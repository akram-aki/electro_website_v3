import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export default function Navbar({ sectionsRefs = {} }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const footerEl = document.getElementById("footer");
    if (footerEl) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(!entry.isIntersecting);
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(footerEl);

      return () => {
        observer.unobserve(footerEl);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed z-50 bottom-3 left-1/2 -translate-x-1/2">
      <SlideTabs sectionsRefs={sectionsRefs} />
    </div>
  );
}

const SlideTabs = ({ sectionsRefs = {} }) => {
  const [cursorPos, setCursorPos] = useState({
    left: 0,
    width: 97,
    opacity: 1,
  });
  const [activePos, setActivePos] = useState({
    left: 0,
    width: 97,
  });
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    { label: "Home", href: "#header" },
    { label: "Events", href: "#events" },
    { label: "Projects", href: "#projects" },
    { label: "Community", href: "#communityDiscord" },
  ];

  const tabRefs = useRef([]);
  tabRefs.current = [];

  const addToRefs = (el) => {
    if (el && !tabRefs.current.includes(el)) {
      tabRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!sectionsRefs || Object.keys(sectionsRefs).length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50% 0px",
      threshold: 0.1,
    };

    const callback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        const topEntry = visibleEntries.reduce((prev, curr) =>
          Math.abs(prev.boundingClientRect.top) < Math.abs(curr.boundingClientRect.top)
            ? prev
            : curr
        );
        const sectionId = topEntry.target.id;
        const newActiveIndex = tabs.findIndex(
          (tab) => tab.href.substring(1) === sectionId
        );
        if (newActiveIndex !== -1 && tabRefs.current[newActiveIndex]) {
          const tabEl = tabRefs.current[newActiveIndex];
          const { offsetLeft } = tabEl;
          const { width } = tabEl.getBoundingClientRect();
          setActivePos({ left: offsetLeft, width });
          setCursorPos({ left: offsetLeft, width, opacity: 1 });
          setActiveIndex(newActiveIndex);
        }
      }
    };

    const observer = new IntersectionObserver(callback, observerOptions);

    tabs.forEach((tab) => {
      const sectionId = tab.href.substring(1);
      const sectionRef = sectionsRefs[sectionId];
      if (sectionRef && sectionRef.current) {
        observer.observe(sectionRef.current);
      }
    });

    return () => {
      tabs.forEach((tab) => {
        const sectionId = tab.href.substring(1);
        const sectionRef = sectionsRefs[sectionId];
        if (sectionRef && sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      });
    };
  }, [sectionsRefs, tabs]);

  return (
    <ul
      className="relative mx-auto flex w-fit md:min-h-[50px] rounded-full border border-Text3 bg-white overflow-visible"
      onMouseLeave={() => setCursorPos({ ...activePos, opacity: 1 })}
    >
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          ref={addToRefs}
          href={tab.href}
          setCursorPos={setCursorPos}
          onClick={() => {
            if (tabRefs.current[index]) {
              const tabEl = tabRefs.current[index];
              const { offsetLeft } = tabEl;
              const { width } = tabEl.getBoundingClientRect();
              setActivePos({ left: offsetLeft, width });
              setCursorPos({ left: offsetLeft, width, opacity: 1 });
              setActiveIndex(index);
            }
          }}
          isActive={index === activeIndex}
          // Hide tab with index 2 on mobile, show on md and up
          className={index === 2 ? "hidden md:block" : ""}
        >
          {tab.label}
        </Tab>
      ))}

      <Cursor position={cursorPos} />
    </ul>
  );
};
const Tab = React.forwardRef(
  ({ href, children, setCursorPos, onClick, isActive, className = "", ...attributes }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        {...attributes}
        onMouseEnter={() => {
          const { width } = ref.current.getBoundingClientRect();
          setCursorPos({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
        }}
        onClick={(e) => {
          onClick(e);
        }}
        className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base transition-colors duration-200 rounded-full ${isActive ? "" : "hover:bg-[#666666]"
          } ${className}`}
      >
        {children}
      </a>
    );
  }
);


const Cursor = ({ position, ...attributes }) => {
  return (
    <motion.li
      animate={{
        x: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{ type: "tween", duration: 0.2 }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12 transform -translate-y-1/2"
      {...attributes}
    ></motion.li>
  );
};
