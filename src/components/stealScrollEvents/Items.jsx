import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// List of image URLs to preload
const images = [
  "/IMG_0110.JPG",
  "/welcomeDay-min.JPG",
  "/IMG_20240516_042629_313.jpg",
  "/TEKKID.png",
];

// Descriptions corresponding to each image/index
const description = [
  {
    header: "Arduino Workshop",
    title:
      "Yearly Arduino Workshops which cover all fundamentals! basics, actuators, sensors, displays, and communications.",
    desc1:
      "Attendees get to experience beginner friendly introduction and hands-on experience by motivated and experienced mentors.",
    desc2:
      "Attendees get to experience beginner friendly introduction and hands-on experience by motivated and experienced mentors.",
  },
  {
    header: "Welcome Day",
    title:
      "The yearly Welcome Day events are introductory events which welcome all new members to the club...",
    desc1:
      "Members also get to enjoy fun activities and mini games to break ice and celebrate the beginning of the new year.",
    desc2:
      "All attendees who later attest to their learning by creating a project obtain a certificate signed by Electro Scientific President.",
  },
  {
    header: "Chess Competition",
    title:
      "The 2024 Electro Club Chess Competition was the club's first national chess competition with more than 20 participants.",
    desc1:
      "A group stage phase where members played fierce chess matches to climb the ladder and finally qualify to the final.",
    desc2:
      "The final match, watched by faculty students and staff, where the 2 finalists battled in an hour-long match.",
  },
  {
    header: "External Visits",
    title:
      "Multiple external visits that partake in different universities around the country.",
    desc1:
      "We make sure our club is exposed across different wilayas and in different universities.",
    desc2:
      "We also offer visits to Middle Schools, High Schools, and foster houses, ensuring all age groups get knowledge on electronics.",
  },
];

/**
 * Custom hook: preloads an array of image URLs and caches HTMLImageElement objects.
 * Returns a `loaded` boolean and a Map cache of src -> HTMLImageElement.
 */
function useImagePreloader(srcArray) {
  const cacheRef = useRef(new Map());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const promises = srcArray.map((src) => {
      if (cacheRef.current.has(src)) return Promise.resolve();
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          cacheRef.current.set(src, img);
          resolve();
        };
        img.onerror = () => resolve();
      });
    });
    Promise.all(promises).then(() => {
      if (!isCancelled) setLoaded(true);
    });
    return () => {
      isCancelled = true;
    };
  }, [srcArray]);

  return { loaded, cache: cacheRef.current };
}

export default function Items({ count, ...attributes }) {
  // clamp count
  const safeCount = Math.min(count, images.length - 1);
  const currentDescription = useMemo(() => description[safeCount], [safeCount]);

  // preload images and block render until done
  const { loaded, cache } = useImagePreloader(images);

  if (!loaded) {
    return (
      <div {...attributes} className="h-full flex items-center justify-center">
        <span>Loading…</span>
      </div>
    );
  }

  // get cached image src (eager load)
  const src = cache.get(images[safeCount])?.src || images[safeCount];

  return (
    <div {...attributes}>
      <div className="p-6 grid">
        <AnimatePresence mode="wait">
          <motion.div
            key={safeCount}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="h-full w-full"
          >
            <h1 className="text-3xl font-bold xl:mb-16 mb-9">
              {currentDescription.header}
            </h1>
            <p className="font-semibold text-Text2 text-sm xl:text-lg mb-8 md:mb-0">
              {currentDescription.title}
            </p>
            <ul className="list-disc p-4 gap-2 xl:mb-16 text-sm xl:text-lg md:block">
              <li className="text-Text4 text-justify">
                {currentDescription.desc1}
              </li>
              <li className="text-Text4 text-justify">
                {currentDescription.desc2}
              </li>
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative h-full w-full overflow-hidden rounded-2xl lg:p-0 p-5">
        <AnimatePresence mode="wait">
          <motion.img
            key={src}
            src={src}
            alt={`event-${safeCount}`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="object-cover w-full h-full rounded-2xl lg:rounded-none"
            loading="eager"
            decoding="async"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
