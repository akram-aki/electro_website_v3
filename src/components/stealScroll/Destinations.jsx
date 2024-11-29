import { motion } from "framer-motion";

const AnimatedSteps = ({ count, ...attributes }) => {
  const currentStep = Math.floor(count / 25) + 1;

  const motionProps = {
    animate: { x: 8 },
    transition: { duration: 0.15, ease: "easeOut" },
  };

  return (
    <div {...attributes}>
      {[1, 2, 3, 4].map((step) => (
        <div key={step}>
          {step === currentStep ? (
            <motion.div {...motionProps} className="font-bold text-[#383837]">
              EVENT /{step}/
            </motion.div>
          ) : (
            <p className="text-[#b5b5b5]">/{step}/ </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnimatedSteps;
