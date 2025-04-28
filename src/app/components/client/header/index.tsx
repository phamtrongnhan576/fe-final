"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Menu from "./MenuHeader";
import MobileMenu from "./MobileMenu";
import { useHeaderScroll } from "../hooks/useHeaderScroll";
import { navItems } from "@/app/lib/client/data/navItems";

const Header = () => {
  const {
    visible,
    setVisible,
    isScrolled,
    dropdownOpen,
    setDropdownOpen,
    scrollDirection,
    pathname,
  } = useHeaderScroll();

  return (
    <motion.nav
      initial={{ y: "-100%", opacity: 0, rotateX: 20 }}
      animate={{
        y: scrollDirection === "down" && isScrolled ? "-100%" : "0%",
        opacity: isScrolled ? 1 : 0.95,
        rotateX: scrollDirection === "down" && isScrolled ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        duration: 0.4,
      }}
      className={`z-50 fixed w-full bg-transparent transition-all duration-500 ${
        isScrolled
          ? "shadow-md bg-white dark:shadow-black dark:bg-gray-900"
          : ""
      }`}
    >
      <div
        className={`relative max-w-7xl mx-auto flex items-center justify-between px-6 ${
          isScrolled ? "py-4" : "py-6"
        } transition-all duration-300`}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image src="/airbnb-1.svg" alt="Logo" width={40} height={40} />
          <span className="text-2xl font-extrabold text-custom-rose tracking-tight">
            airbnb
          </span>
        </Link>

        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex space-x-6 font-semibold">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={`transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-custom-rose"
                      : `dark:text-gray-300 dark:hover:text-custom-rose hover:text-custom-rose ${
                          isScrolled ? "text-gray-600 dark:text-white" : "text-white dark:text-white"
                        }`
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Menu
          setVisible={setVisible}
          visible={visible}
          setDropdownOpen={setDropdownOpen}
          dropdownOpen={dropdownOpen}
          isScrolled={isScrolled}
        />
      </div>

      <MobileMenu
        visible={visible}
        setVisible={setVisible}
        pathname={pathname}
      />
    </motion.nav>
  );
};

export default Header;
