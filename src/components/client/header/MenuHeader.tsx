"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, User, X } from "lucide-react";
import Link from "next/link";
import { useMenuDropdown } from "../hooks/useMenuDropdown";

type MenuHeaderProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const MenuHeader = ({ visible, setVisible }: MenuHeaderProps) => {
  const { theme, setTheme, dropdownOpen, setDropdownOpen, dropdownRef } =
    useMenuDropdown();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-gray-700 dark:text-gray-300 hover:bg-transparent dark:hover:bg-transparent cursor-pointer"
      >
        {theme === "dark" ? (
          <Sun className="!h-4 md:!h-6 !w-4 md:!w-6 hover:none text-white dark:text-white" />
        ) : (
          <Moon className="!h-4 md:!h-6 !w-4 md:!w-6 hover:none text-white dark:text-white" />
        )}
      </Button>

      <div className="flex md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setVisible(!visible)}
          className="hover:bg-transparent hover:text-white dark:hover:bg-transparent cursor-pointer text-white dark:text-white"
        >
          {visible ? (
            <X className="!h-5 !w-5" />
          ) : (
            <Menu className="!h-5 !w-5" />
          )}
        </Button>
      </div>

      <div className="hidden md:flex relative" ref={dropdownRef}>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex rounded-full hover:bg-transparent dark:hover:bg-transparent cursor-pointer dark:cursor-pointer"
            >
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-black border-3 border-custom-rose">
                  <User
                    className="text-white"
                    style={{ width: "25px", height: "25px" }}
                  />
                </AvatarFallback>
              </Avatar>
              {/* <span
                className={`uppercase font-semibold text-sm ${
                  isScrolled
                    ? "text-gray-600 dark:text-white"
                    : "text-white dark:text-white"
                }`}
              >
                minh
              </span> */}
            </Button>
          </DropdownMenuTrigger>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[calc(100%+20px)] right-0 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2"
              >
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Settings
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Earnings
                </Link>
                <button className="flex w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MenuHeader;
