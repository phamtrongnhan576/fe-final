import { type ReactNode } from "react";
import Footer from "../../../components/client/Footer";
import HomeFooter from "./components/HomeFooter";




interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <Footer />
      <main className="min-h-screen container mx-auto p-6">{children}</main>
      <HomeFooter />
    </div>
  );
}