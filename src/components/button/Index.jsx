import { useRef } from "react";
import styles from "./style.module.scss";
import { gsap } from "gsap";
export default function Button({
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
      scale: 1.5,
      duration: 0.4,
    });
  };
  const manageMouseLeave = () => {
    gsap.to(circle.current, {
      right: "100%",
      scale: 1,
      duration: 0.4,
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
            height: "100%",
            width: "100%",
            borderRadius: "9999rem",
            right: "100%",
          }}
        ></div>
      </div>
    </>
  );
}
