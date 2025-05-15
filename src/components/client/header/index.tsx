"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Menu from "./MenuHeader";
import MobileMenu from "./MobileMenu";
import { useHeaderScroll } from "../hooks/useHeaderScroll";
import { navItems } from "@/lib/client/types/dataTypes";
import { useLocale, useTranslations } from "next-intl";

const Header = () => {

  const { isScrolled, isMounted, pathname, visible, setVisible } =
    useHeaderScroll();

  const t = useTranslations("Header");
  const locale = useLocale();

  if (!isMounted) return null;

  const translatedNavItems = navItems.map((item) => ({
    ...item,
    label: t(item.label),
  }));

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
          <div className="relative w-7 h-7 md:w-8 md:h-8">
            <Image
              src="/airbnb-1.svg"
              alt="Logo"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <span className="text-custom-rose text-xl md:text-2xl font-extrabold tracking-tight">
            airbnb
          </span>
        </Link>

        <div className="hidden md:flex">
          <ul className="flex space-x-6 font-semibold">
            {translatedNavItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={`/${locale}${item.href}`}
                  className={`transition-colors duration-200 ${pathname === `/${locale}${item.href}`
                      ? "text-rose-600"
                      : "dark:hover:text-rose-600 hover:text-rose-600 text-white"
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
