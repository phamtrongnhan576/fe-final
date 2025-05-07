import { fetchPosition } from "@/lib/client/services/fetch";
import { slugify } from "@/lib/utils";
import RoomsContent from "../../../../components/client/rooms/RoomsContent";

export default async function RoomsPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  
  const positions = await fetchPosition();
  const position = positions.find(pos => slugify(pos.tinhThanh) === location);

  if (!position) {
    return <div>Location not found</div>;
  }
  
  return <RoomsContent id={position.id.toString()} position={position} />;
}