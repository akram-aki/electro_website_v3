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
                    Electro Club Community{" "}
                    <span className="relative inline-block">
                        <span className="text-black">Discord</span>
                        <motion.span
                            className="absolute inset-0 gradient-text"
                            initial={{ backgroundPosition: "0% 50%", opacity: 1 }}
                            whileInView={{
                                backgroundPosition: "100% 50%",
                                opacity: 0,
                            }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                backgroundPosition: { duration: 1, ease: "linear" },
                                opacity: { duration: 1, ease: "easeInOut", delay: 0.6 },
                            }}
                        >
                            Discord
                        </motion.span>
                    </span>
                    !
                </motion.h1>
            </div>

            <div className="flex items-center relative">
                <motion.img
                    src="discordServer.png"
                    alt="Discord Server Preview"
                    className="z-0 opacity-80"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />

                <motion.div
                    className="z-10 -ml-[464px] p-4 rounded-md shadow-2xl flex flex-col items-center gap-6 text-lg bg-white/60"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                >
                    <h3 className="text-center max-w-[900px]">
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
