"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/client/store/store";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { getRoomsByPosition } from "@/lib/client/services/apiService";
import ListRoom from "@/components/client/rooms/ListRoom";
import Loading from "@/components/client/common/Loading";
import Error from "@/components/client/common/Error";

export default function RoomsPage() {
  const params = useParams();
  const { location } = params;


  const positions = useSelector((state: RootState) => state.position);

  const position = positions.find((pos) => pos.slug === location)

  const key = position?.id
    ? `/api/phong-thue/lay-phong-theo-vi-tri/${position.id}`
    : null;

  const fetcher = () => getRoomsByPosition(position!.id.toString());

  const { data: rooms, error, isLoading } = useSWR(key, fetcher);

  if (isLoading) return <Loading />;
  if (error || !position || !rooms) return <Error />;

  return (
    <div>
      <ListRoom rooms={rooms} position={position!} />
    </div>
  );
}
