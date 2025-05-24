"use client";

import Footer from "@/components/client/footer";
import Header from "@/components/client/header";
import FilterRoom from "@/components/client/rooms/FilterRoom";
import Search from "@/components/client/search";
import { ToastContainer } from "react-toastify";
import AOSInitializer from "@/lib/client/providers/AOSInitializer";
import { ReactNode } from "react";
import Banner from "@/components/client/banner";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import SubBanner from "@/components/client/banner/SubBanner";

export default function HomeLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();

  const isHomePage = pathname === `/${locale}`;
  return (
    <>
      <AOSInitializer />
      <Header />
      {isHomePage ? (
        <>
          <Banner />
        </>
      ) : (
        <SubBanner />
      )}
      <Search />
      <FilterRoom />
      <main>
        {children}
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
}
