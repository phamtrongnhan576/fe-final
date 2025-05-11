import { getRoomsByPosition } from "@/lib/client/services/apiService";
import ListRoom from "./ListRoom";
import { handleApiError } from "@/lib/client/services/notificationService";
import { AxiosError } from "axios";
import { PositionWithSlug } from "@/lib/client/types/types";

export default async function RoomsContent({ id, position }: { id: string; position: PositionWithSlug }) {
  let rooms;

  try {
    rooms = await getRoomsByPosition(id);
  } catch (error) {
    handleApiError(error as AxiosError);
  }

  if (!rooms) return;

  return (
    <div>
      <ListRoom rooms={rooms} position={position} />
    </div>
  );
}
