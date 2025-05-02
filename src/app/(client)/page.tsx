import Banner from "@/components/client/banner";
import Search from "@/components/client/search";

import { type NextPage } from "next";

const HomePage: NextPage = async () => {
  return (
    <>
      <Banner />
      <Search />
    </>
  );
};

export default HomePage;
