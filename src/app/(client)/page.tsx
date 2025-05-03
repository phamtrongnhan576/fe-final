import ListPosition from "@/components/client/position/ListPosition";
import HomeRooms from "@/components/client/rooms/HomeRooms";

export default async function HomePage() {
  return (
    <>
      <ListPosition />
      <HomeRooms />
    </>
  );
}
