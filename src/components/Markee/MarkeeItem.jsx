import { motion } from "framer-motion";

const MarqueeItem = ({ images, from, to }) => {
  const color = ["text-[#7b7a79]", "text-[#b5b5b5]", "text-[#96c390]"];

  return (
    <div className="flex MyGradient">
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((image, index) => {
          return (
            <>
              <p className={`${color[index]} font-bold ml-10`} key={index}>
                {image}
              </p>
            </>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MarqueeItem;
