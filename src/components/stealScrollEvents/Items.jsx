import { motion, AnimatePresence } from "framer-motion";
import { Secondary_button } from "../button/Index";
import DownIcon from "../../assets/DownIcon.svg"
import RightArrow from "../../assets/RightArrow.svg"
const description = [
  {
    title:
      "Yearly Arduino Workshops which cover all fundamentals! basics, actuators, sensors, displays, and communications. ",
    desc1:
      "Attendees get to experience beginner friendly introduction and hands-on experience by motivated and experienced mentors.",
    desc2:
      "Additional features: we advice you on the additional features you can add to your website. This could be animations, transitions, additional sections, etc.",
  },

  {
    title:
      "The yearly Welcome Day events are introductory events which welcome all new members to the club by providing a brief presentation which introduces the club, its members, departments, and goals for the year.",
    desc1:
      "Members also get to enjoy fun activites and mini games to break ice and celebrate the beginning of the new year.",
    desc2:
      "All attendees who later attest to their learning by creating a project obtain a certificate signed by Electro Scientific President",
  },

  {
    title:
      "The 2024 Electro Club Chess Competition was the club's first national chess competition with more than 20 participants. The competition consisted of 2 phases:",
    desc1:
      "A group stage phase where members played fierce chess matches to climb the ladder and finally qualify to the final.",
    desc2:
      "The final match, watched by faculty students and staff, where the 2 finalists battled in an hour long match.",
  },

  {
    title:
      "Multiple external visits that partake in different universities around the country.",
    desc1:
      "We make sure our club is exposed across different wilayas and in different universities. Whenever possible, we display our hard effort via stands across multiple events in multiple universities",
    desc2:
      "We also offer vists to Middle Schools, High Schools, and foster houses. Making sure all age groups get knowledge on everything electronics."
  },

  {
    title:
      "The initial phase usually consist of choosing a design, then deciding the appearance, content, visual effects and additional features of the website and we will give you a budget proposal.",
    desc1:
      "Choosing a design/template: we do not design from scratch. We use existing website and design layout as reference and recreate a new system that matches your business image.",
    desc2:
      "Additional features: we advice you on the additional features you can add to your website. This could be animations, transitions, additional sections, etc.",
  },
];
export default function Items({ count, ...attributes }) {
  return (
    <div {...attributes}>
      <div className="p-6 grid">
        <AnimatePresence mode="wait">
          <motion.div
            key={count} // Unique key per `count` value
            initial={{ opacity: 1, x: 10 }} // Proper initial state
            animate={{ opacity: 1, x: 0 }} // Enter animation
            exit={{ opacity: 0, x: 10 }} // Exit animation
            transition={{
              opacity: { duration: 0.1, ease: "easeInOut" }, // Shared transition for `opacity`
              x: { duration: 0.2 }, // Shared for `x`
            }}
            className="h-full w-full"
          >

            <h1 className="text-3xl font-bold xl:mb-16 mb-9">
              {count === 0
                ? "Arduino Workshop"
                : count === 1
                  ? "Welcome Day"
                  : count === 2
                    ? "Chess Competition"
                    : "External Events"}
            </h1>

            <p className="font-semibold text-Text2 text-sm xl:text-lg">
              {count === 0
                ? description[0].title
                : count === 1
                  ? description[1].title
                  : count === 2
                    ? description[2].title
                    : description[3].title}
            </p>
            <ul className="list-disc p-4 grid gap-2 xl:mb-16 text-sm xl:text-lg" >
              <li className="text-Text4">
                {count === 0
                  ? description[0].desc1
                  : count === 1
                    ? description[1].desc1
                    : count === 2
                      ? description[2].desc1
                      : description[3].desc1}
              </li>

              <li className="text-Text4">
                {count === 0
                  ? description[0].desc2
                  : count === 1
                    ? description[1].desc2
                    : count === 2
                      ? description[2].desc2
                      : description[3].desc2}
              </li>
            </ul>
            <div className="flex gap-8">
              <Secondary_button>
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
            key={count} // Unique key per `count` value
            initial={{ opacity: 0, x: 400 }} // Proper initial state
            animate={{ opacity: 1, x: 0 }} // Enter animation
            exit={{ opacity: 0, x: 400 }} // Exit animation
            transition={{
              opacity: { duration: 0.1, ease: "easeInOut" }, // Shared transition for `opacity`
              x: { duration: 0.2 }, // Shared for `x`
            }}
            className="h-full w-full"
          >
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
