import Footer from "@/components/client/footer";
import Header from "@/components/client/header";
import { type ReactNode } from "react";

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
