import { motion } from "framer-motion";

const AnimatedSteps = ({ count }) => {
  // Determine the current step based on the count
  const currentStep = Math.floor(count / 25) + 1;

  // Define animation settings
  const motionProps = {
    animate: { x: 8 },
    transition: { duration: 0.15, ease: "easeIn" },
  };

  // Render steps
  return (
    <div className="flex gap-3 transition-transform absolute  top-28 left-12">
      {[1, 2, 3, 4].map((step) => (
        <div key={step}>
          {step === currentStep ? (
            <motion.div {...motionProps} className="font-bold text-[#383837]">
              STEP /{step}/
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
