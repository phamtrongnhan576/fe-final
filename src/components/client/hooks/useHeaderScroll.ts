import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useHeaderScroll = (): {
  isScrolled: boolean;
  isMounted: boolean;
  pathname: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
} => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop >= 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    isScrolled,
    isMounted,
    pathname,
    visible,
    setVisible,
  };
};
