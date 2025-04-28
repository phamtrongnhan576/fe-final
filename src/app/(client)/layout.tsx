import { type ReactNode } from "react";
import Header from "@/app/components/client/header";
import Footer from "@/app/components/client/footer";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="flex-1 bg-white dark:bg-gray-900"
        style={{ minHeight: "2000px" }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
