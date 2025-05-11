import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/lib/client/types/dataTypes";

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
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-x-0 top-16 z-50 block overflow-hidden border-t border-gray-200 bg-white shadow-lg md:hidden dark:border-gray-700 dark:bg-gray-900"
        >
          <motion.ul
            className="flex flex-col space-y-4 p-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {navItems.map((item) => (
              <motion.li
                key={item.key}
                variants={{
                  hidden: { x: -20, opacity: 0 },
                  visible: { x: 0, opacity: 1 }
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.href}
                  className={`flex items-center py-3 px-4 text-lg font-medium transition-all duration-200 rounded-lg ${pathname === item.href
                      ? "text-custom-rose bg-rose-50 dark:bg-gray-800"
                      : "text-gray-600 hover:text-custom-rose hover:bg-gray-100 dark:text-gray-300 dark:hover:text-custom-rose dark:hover:bg-gray-800"
                    }`}
                  onClick={() => setVisible(false)}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>

          <div className="px-6 pb-6">
            <button
              onClick={() => setVisible(false)}
              className="w-full py-3 text-sm font-medium text-center text-gray-500 transition-colors duration-200 rounded-lg hover:text-custom-rose hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 cursor-pointer"
            >
              Close Menu
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;