import Link from 'next/link';
import { useTranslations } from "next-intl";

export default function FilterRoom() {
  const t = useTranslations("FilterRoom");

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      <Link
        href="/under-dev"
        className="rounded-lg border text-md px-6 py-2 text-black border-gray-300 duration-300 cursor-pointer hover:bg-rose-100 hover:text-rose-600 hover:border-transparent dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        {t("Accommodation type")}
      </Link>
      <Link
        href="/under-dev"
        className="rounded-lg border text-md px-6 py-2 text-black border-gray-300 duration-300 cursor-pointer hover:bg-rose-100 hover:text-rose-600 hover:border-transparent dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        {t("Price")}
      </Link>
      <Link
        href="/under-dev"
        className="rounded-lg border text-md px-6 py-2 text-black border-gray-300 duration-300 cursor-pointer hover:bg-rose-100 hover:text-rose-600 hover:border-transparent dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        {t("Book now")}
      </Link>
      <Link
        href="/under-dev"
        className="rounded-lg border text-md px-6 py-2 text-black border-gray-300 duration-300 cursor-pointer hover:bg-rose-100 hover:text-rose-600 hover:border-transparent dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        {t("Room and bedroom")}
      </Link>
      <Link
        href="/under-dev"
        className="rounded-lg border text-md px-6 py-2 text-black border-gray-300 duration-300 cursor-pointer hover:bg-rose-100 hover:text-rose-600 hover:border-transparent dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        {t("Other filters")}
      </Link>
    </div>
  );
}
