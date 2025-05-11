import { getCommentsById, getRoomsById } from "@/lib/client/services/apiService";
import { sortCommentsByIdDescending } from "@/lib/utils";
import CommentsSection from "@/components/client/rooms/CommentsSection";
import RoomHeader from "@/components/client/room-detail/RoomHeader";
import RoomDetails from "@/components/client/room-detail/RoomDetails";
import BookingForm from "@/components/client/room-detail/BookingForm";
import RoomAmenities from "@/components/client/room-detail/RoomAmenities";
import CommentForm from "@/components/client/room-detail/CommentForm";
import RoomImage from "@/components/client/room-detail/RoomImage";

export default async function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const room = await getRoomsById(id);
  const comments = await getCommentsById(id);

  const sortedComments = sortCommentsByIdDescending(comments);

  return (
    <div className="container mx-auto py-5 space-y-5">
      {/* Room title */}
      <RoomHeader room={room} />

      {/* Room images carousel */}
      <RoomImage roomImage={room.hinhAnh} />

      {/* Room details and booking */}
      <div className="grid grid-cols-1 lg:flex lg:gap-0 justify-between gap-5">
        <div className="basis-7/12 space-y-5">
          <RoomDetails />
        </div>

        {/* Booking form */}
        <div className="basis-4/12">
          <BookingForm room={room} comments={comments} />
        </div>
      </div>

      {/* Amenities */}
      <RoomAmenities />

      <div className="pb-[30px]"></div>
      <div className="mb-5 w-full h-px bg-gray-300"></div>

      {/* Comment form */}
      <CommentForm id={room.id} />

      <div className="mb-5 w-full h-px bg-gray-300"></div>

      {/* Comments section */}
      <CommentsSection comments={sortedComments} />
    </div>
  );
}