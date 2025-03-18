import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ projectImg, projectTitle, projectAuthor, ...attributes }) => {
    return (
        <motion.div
            className="flex flex-col gap-6 max-w-lg bg-Background rounded-lg shadow-md overflow-hidden md:w-96 xl:w-[500px]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 50,
                }
            }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ height: "100%" }}
        >
            <motion.img
                src={projectImg}
                alt={projectTitle}
                className="md:h-60 xl:h-96 w-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            />
            <div className="flex flex-col flex-grow px-4">
                <h3 className="text-black text-md font-semibold mb-3 line-clamp-2">
                    {projectTitle}
                </h3>
                <div className="flex justify-between items-center mt-auto pb-4">
                    <span className="text-[#797877] text-md">
                        By <span className="text-black">{projectAuthor}</span>
                    </span>
                    <motion.button
                        className="text-black hover:underline"
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Details
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;