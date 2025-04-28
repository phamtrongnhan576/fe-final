"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const Banner: FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative w-full flex items-center h-[50vh] md:h-[60vh] lg:h-[70vh] 2xl:h-[80vh]">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/bannerVideo.png"
        className="absolute inset-0 w-full h-full object-cover "
      >
        <source src="/vietnam-my-home.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="container mx-auto px-4 md:px-10 z-10">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col justify-center items-center md:items-start gap-4 text-center md:text-left">
            <div className="flex items-center">
              <Image
                src="/airbnb-1.svg"
                alt="Airbnb logo"
                width={56}
                height={56}
                className="w-12 md:w-14 mr-4"
              />
              <motion.h2
                className="text-3xl md:text-5xl lg:text-7xl text-custom-rose hover:text-custom-rose/80 font-bold transition-colors duration-200"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                airbnb
              </motion.h2>
            </div>
            <motion.p
              className="text-white text-lg md:text-2xl lg:text-3xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Belong anywhere
            </motion.p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <Image
          src={
            theme === "dark"
              ? "/swoosh-hero-dark.png"
              : "/swoosh-hero-light.png"
          }
          alt="Decorative swoosh"
          width={1920}
          height={600}
          className="w-full h-auto object-cover z-0"
        />
      </div>
    </div>
  );
};

export default Banner;
