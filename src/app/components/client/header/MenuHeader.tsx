"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, User, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useRef } from "react";

const MenuHeader = ({
  visible,
  setVisible,
  dropdownOpen,
  setDropdownOpen,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (dropdownOpen: boolean) => void;
}) => {
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [setDropdownOpen]);

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="inline-flex p-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        {theme === "dark" ? (
          <Sun className="h-6 w-6" />
        ) : (
          <Moon className="h-6 w-6" />
        )}
      </Button>

      <div className="flex md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setVisible(!visible)}
          className="p-2 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          {visible ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <div className="hidden md:flex gap-3 items-center" ref={dropdownRef}>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-black">
                  <User
                    className="text-white"
                    style={{ width: "25px", height: "25px" }}
                  />
                </AvatarFallback>
              </Avatar>
              <span className="uppercase font-semibold text-sm dark:text-gray-300">
                minh
              </span>
            </Button>
          </DropdownMenuTrigger>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[calc(100%+8px)] right-0 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50"
              >
                <Link
                  href="/info-user"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Settings
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Earnings
                </Link>
                <button className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
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
