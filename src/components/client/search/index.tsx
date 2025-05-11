"use client";

import { useState, useEffect } from "react";
import { fetchPosition } from "@/lib/client/services/apiService";
import SearchPanelMobile from "./SearchPanelMobile";
import SearchPanel from "./searchPanel";
import { useDispatch } from "react-redux";
import { Position, PositionWithSlug } from "@/lib/client/types/types";
import { slugify } from "transliteration";
import { setPositions } from "@/lib/client/store/slices/positionSlice";
import useApi from "@/lib/client/services/useAPI";
import Loading from "../common/Loading";
import Error from "../common/Error";
const Search = () => {
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();

  const { data, error, isLoading } = useApi("/api/vi-tri", () => fetchPosition());

  useEffect(() => {
    if (data) {
      const positions: PositionWithSlug[] = data.map((position: Position) => ({
        id: position.id,
        tenViTri: position.tenViTri,
        tinhThanh: position.tinhThanh,
        quocGia: position.quocGia,
        hinhAnh: position.hinhAnh,
        slug: slugify(position.tinhThanh),
      }));
      dispatch(setPositions(positions));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);


  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return isMobile ? (
    <SearchPanelMobile />
  ) : (
    <SearchPanel />
  );
};

export default Search;
