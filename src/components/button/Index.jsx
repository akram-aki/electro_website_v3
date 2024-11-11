import { useRef, useState } from "react";
import styles from "./style.module.scss";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export function Primary_button({
  children,
  hoverBackgroundColor,
  backgroundColor,
  ...attributes
}) {
  backgroundColor = backgroundColor || "#262626";
  hoverBackgroundColor = hoverBackgroundColor || "#dad6e3";

  const circle = useRef(null);

  const manageMouseEnter = () => {
    gsap.to(circle.current, {
      right: "0%",
      scale: 3,
      duration: 0.4,
      ease: "power1.inOut",
    });
  };
  const manageMouseLeave = () => {
    gsap.to(circle.current, {
      right: "100%",
      scale: 1,
      duration: 0.4,
      ease: "power1.inOut",
    });
  };
  return (
    <>
      <div
        className={styles.roundedButton}
        onMouseEnter={(e) => {
          manageMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          manageMouseLeave(e);
        }}
        style={{ backgroundColor }}
        {...attributes}
      >
        {children}

        <div
          ref={circle}
          className="absolute  "
          style={{
            backgroundColor: hoverBackgroundColor,
            height: "100px",
            width: "100px",
            borderRadius: "9999rem",
            top: "0",
            right: "100%",
          }}
        ></div>
      </div>
    </>
  );
}

export function Secondary_button({ children, ...attributes }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className=" overflow-hidden h-7  ">
      <button
        className=""
        onMouseEnter={(e) => {
          setHovered(!hovered);
        }}
        onMouseLeave={(e) => {
          setHovered(!hovered);
        }}
      >
        <motion.div {...attributes} animate={{ y: hovered ? "0%" : "-50%" }}>
          <p>{children}</p>
          <p>{children}</p>
        </motion.div>
      </button>
    </div>
  );
}
