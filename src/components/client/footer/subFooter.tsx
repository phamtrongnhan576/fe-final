"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFooterScroll } from "../hooks/useFooterScroll";


const SubFooter = () => {
  const { isAtBottom, y, scale, mounted } = useFooterScroll();

  if (!mounted) return null;

  return (
    <motion.div
      style={{ y, scale }}
      className={`
        ${
          isAtBottom ? "relative" : "sticky bottom-0 z-20"
        } w-full shadow-2xl dark:shadow-black px-10 justify-between items-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-white py-4 bg-white dark:bg-gray-900 hidden lg:flex`}
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
      <div className="text-gray-800 dark:text-white flex items-center space-x-3">
        <span>
          <Globe className="inline-block h-4 w-4" />
        </span>
        <span className="hover:underline cursor-pointer font-medium">
          Tiếng Việt (VN)
        </span>
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
