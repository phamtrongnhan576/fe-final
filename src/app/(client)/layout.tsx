import Banner from "@/components/client/banner";
import Footer from "@/components/client/footer";
import Header from "@/components/client/header";
import FilterRoom from "@/components/client/rooms/FilterRoom";
import Search from "@/components/client/search";
import { type ReactNode } from "react";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Banner />
      <Search />
      <FilterRoom />
      <main
        className="flex-1 bg-white dark:bg-gray-900"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
