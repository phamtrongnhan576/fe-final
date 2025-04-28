import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { navItems } from "@/app/lib/client/data/navItems";

type MobileMenuProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  pathname: string;
};

const MobileMenu = ({ visible, setVisible, pathname }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <ul className="flex flex-col gap-4 p-6">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={`block font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-rose-500"
                      : "text-gray-600 dark:text-gray-300 hover:text-rose-500"
                  }`}
                  onClick={() => setVisible(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-black dark:bg-gray-300">
                  <User
                    className="text-white dark:text-gray-700"
                    style={{ width: "25px", height: "25px" }}
                  />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium dark:text-gray-300">minh</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
