"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";
export default function Banner() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("Banner");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] 2xl:h-[80vh]">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/bannerVideo.png"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/vietnam-my-home.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute container mx-auto px-4 md:px-10 h-full flex justify-center flex-col items-center md:items-start gap-2 md:gap-4">
        <div className="flex items-center">
          <div className="relative w-10 h-10 md:w-14 md:mr-4 mr-2">
            <Image
              src="/airbnb-1.svg"
              alt="Airbnb logo"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <motion.h2
            className="text-3xl md:text-5xl lg:text-7xl text-custom-rose font-bold transition-colors duration-200 cursor-default"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            airbnb
          </motion.h2>
        </div>
        <motion.p
          className="text-white text-lg md:text-2xl lg:text-3xl cursor-default"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {t("Belong anywhere")}
        </motion.p>
      </div>
      <div className="absolute bottom-0 w-full">
        <Image
          src={
            theme === "dark"
              ? "/swoosh-hero-dark.png"
              : "/swoosh-hero-light.png"
          }
          alt="Decorative swoosh pattern for Vietnam travel experience"
          width={1920}
          height={600}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
}
