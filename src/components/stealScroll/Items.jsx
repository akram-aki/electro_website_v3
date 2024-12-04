import { motion, AnimatePresence } from "framer-motion";

const description = [
  {
    title:
      "The initial phase usually consist of choosing a design, then deciding the appearance, content, visual effects and additional features of the website and we will give you a budget proposal.",
    desc1:
      "Choosing a design/template: we do not design from scratch. We use existing website and design layout as reference and recreate a new system that matches your business image.",
    desc2:
      "Additional features: we advice you on the additional features you can add to your website. This could be animations, transitions, additional sections, etc.",
  },

  {
    title:
      "The initial phase usually consist of choosing a design, then deciding the appearance, content, visual effects and additional features of the website and we will give you a budget proposal.",
    desc1:
      "Choosing a design/template: we do not design from scratch. We use existing website and design layout as reference and recreate a new system that matches your business image.",
    desc2:
      "Additional features: we advice you on the additional features you can add to your website. This could be animations, transitions, additional sections, etc.",
  },

  {
    title:
      "The initial phase usually consist of choosing a design, then deciding the appearance, content, visual effects and additional features of the website and we will give you a budget proposal.",
    desc1:
      "Choosing a design/template: we do not design from scratch. We use existing website and design layout as reference and recreate a new system that matches your business image.",
    desc2:
      "Additional features: we advice you on the additional features you can add to your website. This could be animations, transitions, additional sections, etc.",
  },

  {
    title:
      "The initial phase usually consist of choosing a design, then deciding the appearance, content, visual effects and additional features of the website and we will give you a budget proposal.",
    desc1:
      "Choosing a design/template: we do not design from scratch. We use existing website and design layout as reference and recreate a new system that matches your business image.",
    desc2:
      "Additional features: we advice you on the additional features you can add to your website. This could be animations, transitions, additional sections, etc.",
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
      <div className="w-full  h-full p-6 grid">
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
            <p className="font-semibold text-Text2">
              {count === 0
                ? description[0].title
                : count === 1
                ? description[1].title
                : count === 2
                ? description[2].title
                : description[3].title}
            </p>
            <ul className="list-disc p-4 grid gap-2">
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
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative h-full w-fit overflow-hidden ">
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
                  ? "https://i.pinimg.com/236x/9e/ef/a6/9eefa6a5680c69a3dd84904d474f6a0e.jpg"
                  : count === 1
                  ? "https://i.pinimg.com/236x/d7/b2/38/d7b2386435a98f8162d783b9d5e14ba5.jpg"
                  : count === 2
                  ? "https://i.pinimg.com/236x/05/a5/59/05a559f70b09f92d6c473de4e6b7212b.jpg"
                  : "https://i.pinimg.com/236x/9e/ef/a6/9eefa6a5680c69a3dd84904d474f6a0e.jpg"
              }
              className="aspect-square object-cover rounded-2xl h-full w-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
