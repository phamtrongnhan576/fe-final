import Banner from "@/components/client/banner";
import Footer from "@/components/client/footer";
import Header from "@/components/client/header";
import FilterRoom from "@/components/client/rooms/FilterRoom";
import Search from "@/components/client/search";
import { ToastContainer } from 'react-toastify';
import AOSInitializer from "@/lib/client/providers/AOSInitializer";
import { type ReactNode } from "react";
import "../../app/(client)/globalsClient.css";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AOSInitializer />
      <Header />
      <Banner />
      <Search />
      <FilterRoom />
      <main
        className="flex-1"
      >
        {children}
        <ToastContainer />
      </main>
      <Footer />
    </div>
  );
}
