"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const SubFooter = () => {
  const { scrollY } = useScroll();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [mounted, setMounted] = useState(false);

  const y = useTransform(scrollY, [0, 300], isAtBottom ? [0, 0] : [0, -10]);
  const scale = useTransform(
    scrollY,
    [0, 300],
    isAtBottom ? [1, 1] : [1, 0.98]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const threshold = 50;
      setIsAtBottom(scrollTop + windowHeight >= fullHeight - threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      style={{ y, scale, willChange: "transform" }}
      className={`
        ${isAtBottom ? "relative" : "sticky bottom-0"} 
        w-full
        shadow-2xl
        px-10 justify-between items-center
        text-gray-500 dark:text-gray-400
        border-t border-gray-200 dark:border-gray-700
        py-4
        bg-white dark:bg-gray-900
        hidden lg:flex
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div>
        <span>© {new Date().getFullYear()} Airbnb, Inc.</span>
        <Link
          href="https://www.airbnb.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 hover:underline"
        >
          Quyền riêng tư
        </Link>
        .
        <Link
          href="https://www.airbnb.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 hover:underline"
        >
          Điều khoản
        </Link>
        .
        <Link
          href="https://www.airbnb.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 hover:underline"
        >
          Sơ đồ trang web
        </Link>
        .
      </div>
      <div className="text-gray-800 dark:text-gray-400 flex items-center space-x-3">
        <span>
          <Globe className="inline-block h-4 w-4" />
        </span>
        <span className="hover:underline cursor-pointer font-medium">
          Tiếng Việt (VN)
        </span>
        <i className="fa fa-dollar-sign font-medium cursor-pointer"></i>
        <span className="hover:underline cursor-pointer font-medium px-2">
          VND
        </span>
        <span className="hover:underline cursor-pointer font-medium px-2">
          Hỗ trợ tài nguyên
        </span>
      </div>
    </motion.div>
  );
};

export default SubFooter;
