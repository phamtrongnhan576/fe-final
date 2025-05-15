import Link from "next/link";
import SubFooter from "./subFooter";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations('Footer');
  const aboutLinks = t.raw('aboutLinks') as string[];
  const communityLinks = t.raw('communityLinks') as string[];
  const hostLinks = t.raw('hostLinks') as string[];
  const supportLinks = t.raw('supportLinks') as string[];

  return (
    <>
      <footer className="border-t bg-gray-100 dark:bg-gray-900 dark:border-gray-700">
        <div className="container mx-auto py-6 px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-3">
              <h2 className="font-bold uppercase text-sm text-gray-800 dark:text-gray-100">
                {t('about')}
              </h2>
              <ul className="text-sm space-y-3 text-gray-600 dark:text-gray-400">
                {aboutLinks.map((text: string, idx: number) => (
                  <li key={idx}>
                    <Link
                      href="https://www.airbnb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:underline text-sm"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-bold uppercase text-sm text-gray-800 dark:text-gray-100">
                {t('community')}
              </h2>
              <ul className="text-sm space-y-3 text-gray-600 dark:text-gray-400">
                {communityLinks.map((text: string, idx: number) => (
                  <li key={idx}>
                    <Link
                      href="https://www.airbnb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:underline text-sm"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-bold uppercase text-sm text-gray-800 dark:text-gray-100">
                {t('host')}
              </h2>
              <ul className="text-sm space-y-3 text-gray-600 dark:text-gray-400">
                {hostLinks.map((text: string, idx: number) => (
                  <li key={idx}>
                    <Link
                      href="https://www.airbnb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:underline text-sm"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="font-bold uppercase text-sm text-gray-800 dark:text-gray-100">
                {t('support')}
              </h2>
              <ul className="text-sm space-y-3 text-gray-600 dark:text-gray-400">
                {supportLinks.map((text: string, idx: number) => (
                  <li key={idx}>
                    <Link
                      href="https://www.airbnb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:underline text-sm"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <SubFooter />
    </>
  );
};

export default Footer;
