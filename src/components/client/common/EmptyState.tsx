import { FaHome, FaSearch, FaBoxOpen, FaInfoCircle } from "react-icons/fa";

type EmptyStateProps = {
  icon?: "home" | "search" | "box" | "info";
  title: string;
  description: string;
  actionText?: string;
  className?: string;
};

const iconMap = {
  home: <FaHome />,
  search: <FaSearch />,
  box: <FaBoxOpen />,
  info: <FaInfoCircle />,
};

export default function EmptyState({
  icon = "info",
  title,
  description,
  actionText,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`mx-auto container py-12 text-center flex flex-col items-center ${className}`}>
      <div className="text-5xl mb-4 text-rose-500 dark:text-gray-400">
        {iconMap[icon]}
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 dark:text-gray-400">{description}</p>
      {actionText && (
        <button
          className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition dark:bg-gray-800   dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => window.location.reload()}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}