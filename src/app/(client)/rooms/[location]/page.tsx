import { fetchPosition } from "@/lib/client/services/fetch";
import { slugify } from "@/lib/utils";
import RoomsContent from "../../../../components/client/rooms/RoomsContent";
import { toast } from "sonner";

export default async function RoomsPage({ params }: { params: { location: string }; }) {
  const location = params.location;
  const positions = await fetchPosition();
  const position = positions.find(pos => slugify(pos.tinhThanh) === location);

  if (!position) {
    toast.error("Không tìm thấy vị trí", {
      duration: 2000,
      className: "!bg-red-50 !text-red-600 !font-bold !border-[3px] !text-lg !border-red-500",
      position: "top-right",
    });
    return;
  }

  return <RoomsContent id={position.id.toString()} position={position} />;
}
