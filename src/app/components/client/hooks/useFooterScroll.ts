import { useState, useEffect } from "react";
import { useScroll, useTransform, MotionValue, useSpring } from "framer-motion";

export const useFooterScroll = (): {
  isAtBottom: boolean;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  mounted: boolean;
} => {
  const { scrollY } = useScroll();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [mounted, setMounted] = useState(false);

  const yTransform = useTransform(
    scrollY,
    [0, 300],
    isAtBottom ? [0, 0] : [0, -10]
  );
  const scaleTransform = useTransform(
    scrollY,
    [0, 300],
    isAtBottom ? [1, 1] : [1, 0.98]
  );

  const y = useSpring(yTransform, { stiffness: 120, damping: 20, mass: 0.3 });
  const scale = useSpring(scaleTransform, {
    stiffness: 120,
    damping: 20,
    mass: 0.3,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const threshold = 60;
      setIsAtBottom(scrollTop + windowHeight >= fullHeight - threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isAtBottom, y, scale, mounted };
};
