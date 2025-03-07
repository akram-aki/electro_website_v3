import React from 'react'
import { motion } from 'framer-motion'

function CommunityDiscord() {
    return (
        <>
            <div className="flex justify-center mb-12">
                <motion.h1
                    className="text-[70px] font-bold"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    Electro Club Community Discord!
                </motion.h1>
            </div>

            <div className="flex items-center relative">
                {/* Animate the image with a slight scale and fade-in */}
                <motion.img
                    src="discordServer.png"
                    alt="Discord Server Preview"
                    className="z-0 opacity-80"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />

                {/* Animate the text container to slide in from the left and fade in */}
                <motion.div
                    className="z-10 -ml-[464px] p-4 rounded-md shadow-xl flex flex-col items-center gap-4 text-xl bg-white/60"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                >
                    <h3 className="text-center max-w-[900px] shadow-2xl">
                        Join our community discord server to get in touch with us, benefit from online workshops, gaming nights, exciting activities, opportunities, and more!
                    </h3>
                    <h4 className="text-center">
                        be the first to know what we got cooking!
                    </h4>
                    <a href="https://discord.gg/vAKZmj8DSy">
                        <img src="discordJoinButton.png" alt="Join Discord Button" />
                    </a>
                </motion.div>
            </div>
        </>
    )
}

export default CommunityDiscord
