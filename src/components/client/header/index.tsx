"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Menu from "./MenuHeader";
import MobileMenu from "./MobileMenu";
import { useHeaderScroll } from "../hooks/useHeaderScroll";
import { navItems } from "@/lib/client/types/navItems";

const Header = () => {
  const { isScrolled, isMounted, pathname, visible, setVisible } =
    useHeaderScroll();

  if (!isMounted) return null;

  return (
    <motion.nav
      initial={{ y: "-102%", opacity: 0, rotateX: 10 }}
      animate={{
        y: isScrolled ? "-102%" : "0%",
        opacity: isScrolled ? 1 : 0.95,
        rotateX: isScrolled ? 10 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 10,
        mass: 0.8,
      }}
      className="fixed z-50 w-full bg-transparent"
    >
      <div className="relative container mx-auto flex items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/airbnb-1.svg" alt="Logo" width={40} height={40} />
          <span className="text-custom-rose text-2xl font-extrabold tracking-tight">
            airbnb
          </span>
        </Link>

        <div className="hidden md:flex">
          <ul className="flex space-x-6 font-semibold">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={`transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-custom-rose"
                      : "dark:hover:text-custom-rose hover:text-custom-rose text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Menu visible={visible} setVisible={setVisible} />
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
