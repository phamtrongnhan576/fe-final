"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Menu from "./MenuHeader";
import MobileMenu from "./MobileMenu";
import { useHeaderScroll } from "../hooks/useHeaderScroll";

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

  const navItems = [
    { key: "home", label: "Home", href: "/" },
    { key: "about", label: "About", href: "/about" },
    { key: "services", label: "Services", href: "/services" },
    { key: "pricing", label: "Pricing", href: "/pricing" },
    { key: "contact", label: "Contact", href: "/contact" },
  ];

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
      className={`z-50 fixed w-full backdrop-blur-md bg-white/70 dark:bg-gray-900/70 transition-all duration-500 ${
        isScrolled ? "shadow-md dark:shadow-black" : ""
      }`}
    >
      <div
        className={`relative max-w-7xl mx-auto flex items-center justify-between px-6 ${
          isScrolled ? "py-2" : "py-4"
        } transition-all duration-300`}
      >
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <span className="text-2xl font-extrabold text-rose-500 tracking-tight hover:text-rose-600 transition-colors duration-200">
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
                      ? "text-rose-500"
                      : "text-gray-600 dark:text-gray-300 hover:text-rose-500"
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
        />
      </div>

      <MobileMenu
        visible={visible}
        setVisible={setVisible}
        pathname={pathname}
        navItems={navItems}
      />
    </motion.nav>
  );
};

export default Header;
