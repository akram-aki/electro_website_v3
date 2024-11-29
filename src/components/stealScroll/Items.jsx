import { motion, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Items({ count, ...attributes }) {
  const ref = useRef(null);
  const mainControls = useAnimation();
  const secondControls = useAnimation();
  useEffect(() => {
    if (count >= 25 && count <= 50) {
      mainControls.start("visible");
    } else if (count > 50 || count < 25) {
      mainControls.start("hidden");
      secondControls.start("visible");
    }
  }, [count]);
  return (
    <div {...attributes}>
      <div className="w-full  h-full p-6 grid">
        <p className="font-semibold text-Text2">
          The initial phase usually consist of choosing a{" "}
          <span className="text-Text3">design</span>, then deciding the
          appearance, content, visual effects and additional features of the
          website and we will give you a{" "}
          <span className="text-Text3">budget</span> proposal. hi
        </p>
        <ul className="list-disc p-4 grid gap-2">
          <li className="text-Text4">
            Choosing a design/template: we do not design from scratch. We use
            existing website and design layout as reference and recreate a new
            system that matches your business image.
          </li>

          <li className="text-Text4">
            Choosing a design/template: we do not design from scratch. We use
            existing website and design layout as reference and recreate a new
            system that matches your business image.
          </li>

          <li className="text-Text4">
            Choosing a design/template: we do not design from scratch. We use
            existing website and design layout as reference and recreate a new
            system that matches your business image.
          </li>
        </ul>
      </div>
      <div className="relative">
        <motion.div
          variants={{
            hidden: { x: 400 },
            visible: { x: 0 },
          }}
          ref={ref}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <img
            src="https://stablestudio.org/_astro/process-prototype.CxRy4Kzr_Z9UhOn.svg"
            alt="image"
            className="rounded-l-2xl"
          />
        </motion.div>
      </div>
    </div>
  );
}
