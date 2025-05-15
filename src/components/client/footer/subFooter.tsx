"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFooterScroll } from "../hooks/useFooterScroll";
import { useLocale, useTranslations } from "next-intl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const SubFooter = () => {
  const { isAtBottom, y, scale, mounted } = useFooterScroll();
  const t = useTranslations('SubFooter');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const languages = [
    { name: "English", locale: "en" },
    { name: "Việt Nam", locale: "vi" },
  ];

  const [currentLanguage, setCurrentLanguage] = useState(locale);
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (locale: string) => {
    if (locale === currentLanguage) {
      setOpen(false);
      return;
    };
    
    setCurrentLanguage(locale);
    const path = pathname.split("/").slice(2).join("/");
    router.replace(`/${locale}/${path}`);
    router.refresh();
    setOpen(false);
  };


  if (!mounted) return null;

  return (
    <motion.div
      style={{ y, scale }}
      className={`
        ${isAtBottom ? "relative" : "sticky bottom-0 z-50"
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
          {t('privacy')}
        </Link>
        .
        <Link
          href="https://www.airbnb.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 hover:underline"
        >
          {t('terms')}
        </Link>
        .
        <Link
          href="https://www.airbnb.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 hover:underline"
        >
          {t('sitemap')}
        </Link>
        .
      </div>
      <div className="text-gray-800 dark:text-white flex items-center space-x-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger className="flex items-center space-x-2 hover:underline cursor-pointer">
            <Globe className="h-4 w-4" />
            <span className="font-medium">{t('language')}</span>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0">
            <div className="py-2">
              {languages.map((language) => (
                <div
                  key={language.locale}
                  className="flex items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleLanguageChange(language.locale)}
                >
                  <span>{language.name}</span>
                  {currentLanguage === language.locale && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <span className="hover:underline cursor-pointer font-medium px-2">
          {t('currency')}
        </span>
        <span className="hover:underline cursor-pointer font-medium px-2">
          {t('support')}
        </span>
      </div>
    </motion.div>
  );
};

export default SubFooter;