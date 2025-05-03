import { getRoomsByPosition } from "@/lib/client/services/fetch";
import { Position, Room } from "@/lib/client/types/types";
import FilterRoom from "./FilterRoom";
import ListRoom from "./ListRoom";

export default async function RoomsContent({ id, position }: { id: string; position: Position }) {
  const rooms: Room[] = (await getRoomsByPosition(id)) || [];

  return (
    <div>
      <FilterRoom />
      <ListRoom rooms={rooms} position={position} />
    </div>
  );
}
