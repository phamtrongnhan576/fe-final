"use client";

import { useState } from "react";
import { fetchPosition } from "@/lib/client/services/fetch";
import { useEffect } from "react";
import SearchPanelMobile from "./SearchPanelMobile";
import SearchPanel from "./searchPanel";
import { Position } from "@/lib/client/types/types";

const Search = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchPositions = async () => {
      const positions = await fetchPosition();

      setPositions(positions);
    };

    fetchPositions();
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile ? (
    <SearchPanelMobile positions={positions} />
  ) : (
    <SearchPanel positions={positions} />
  );
}

export default Search;
