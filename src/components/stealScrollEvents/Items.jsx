import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Secondary_button } from "../button/Index";
import RightArrow from "../../assets/RightArrow.svg";

const description = [
  {
    header:
      "Arduino Workshop",
    title:
      "Yearly Arduino Workshops which cover all fundamentals! basics, actuators, sensors, displays, and communications. ",
    desc1:
      "Attendees get to experience beginner friendly introduction and hands-on experience by motivated and experienced mentors.",
    desc2:
      "Additional features: we advise you on the additional features you can add to your website. This could be animations, transitions, additional sections, etc.",
  },
  {
    header:
      "Welcome Day",
    title:
      "The yearly Welcome Day events are introductory events which welcome all new members to the club...",
    desc1:
      "Members also get to enjoy fun activities and mini games to break ice and celebrate the beginning of the new year.",
    desc2:
      "All attendees who later attest to their learning by creating a project obtain a certificate signed by Electro Scientific President.",
  },
  {
    header:
      "Chess Competition",
    title:
      "The 2024 Electro Club Chess Competition was the club's first national chess competition with more than 20 participants.",
    desc1:
      "A group stage phase where members played fierce chess matches to climb the ladder and finally qualify to the final.",
    desc2:
      "The final match, watched by faculty students and staff, where the 2 finalists battled in an hour-long match.",
  },
  {
    header:
      "External Visits",
    title:
      "Multiple external visits that partake in different universities around the country.",
    desc1:
      "We make sure our club is exposed across different wilayas and in different universities.",
    desc2:
      "We also offer visits to Middle Schools, High Schools, and foster houses, ensuring all age groups get knowledge on electronics.",
  },
];

export default function Items({ count, ...attributes }) {
  const [showModal, setShowModal] = useState(false);
  count > 3 ? count = 3 : '';
  console.log(count)
  return (
    <div {...attributes}>
      <div className="p-6 grid">
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ opacity: 1, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ opacity: { duration: 0.1, ease: "easeInOut" }, x: { duration: 0.2 } }}
            className="h-full w-full"
          >
            <>
              <h1 className="text-3xl font-bold xl:mb-16 mb-9">
                {description[count].header}
              </h1>
              <p className="font-semibold text-Text2 text-sm xl:text-lg">
                {description[count]?.title}
              </p>
              <ul className="list-disc p-4  gap-2 xl:mb-16 text-sm xl:text-lg hidden md:block">

                <li className="text-Text4">{description[count]?.desc1}</li>
                <li className="text-Text4">{description[count]?.desc2}</li>

              </ul>
            </>


            <div className="flex gap-8">
              <Secondary_button onClick={() => setShowModal(true)}>
                <div className="flex gap-8 items-center">
                  <p>More details</p>
                  <img src={RightArrow} alt="" className="w-8 h-8" />
                </div>
              </Secondary_button>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative h-full w-fit overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={count}
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ opacity: { duration: 0.1, ease: "easeInOut" }, x: { duration: 0.2 } }}
            className="h-full w-full"
          >
            {count < 4 && (
              <img
                alt={count === 2 ? "image" : count === 3 ? "diii" : "idks"}
                src={
                  count === 0
                    ? "/IMG_0110.JPG"
                    : count === 1
                      ? "/IMG_0110.JPG"
                      : count === 2
                        ? "/IMG_20240516_042629_313.jpg"
                        : "/TEKKID.png"

                }
                className="object-cover rounded-2xl xl:h-full xl:w-full"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {
        showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-0 flex justify-center items-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">More Details</h2>
              <p className="text-sm mb-2">{description[count]?.desc1}</p>
              <p className="text-sm mb-4">{description[count]?.desc2}</p>
              <button onClick={() => setShowModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
            </motion.div>
          </div>
        )
      }
    </div >
  );
}
