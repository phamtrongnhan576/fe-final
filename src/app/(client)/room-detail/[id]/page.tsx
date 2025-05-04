import { getCommentsById, getRoomsById } from "@/lib/client/services/fetch";
import { Star, Wifi, Tv, ParkingSquare } from 'lucide-react';
import { MdIron } from 'react-icons/md';
import { FaHandsWash, FaSwimmingPool } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import Link from "next/link";
import RoomImage from "@/components/client/rooms/RoomImage";
import { Comment } from "@/lib/client/types/types";
import { formatDateTime, isValidUrl } from "@/lib/utils";


export default async function RoomDetailPage({ params }: { params: { id: string } }) {
  const room = await getRoomsById(params.id);
  const comments = await getCommentsById(params.id)

  return (

    <div className="container mx-auto py-5 space-y-5">
      {/* Tiêu đề phòng */}
      <h2 className="font-bold text-3xl pt-4">
        {room.tenPhong || "NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!"}
      </h2>

      {/* Thông tin cơ bản */}
      <div className="grid grid-cols-1 gap-5 items-center justify-start md:flex">
        <div className="grid md:flex gap-x-6 gap-y-3">
          <div className="flex gap-x-5">
            <div className="flex gap-x-6">
              <span className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-[#FF5A5F]" />
                <span className="text-gray-600">Chủ nhà siêu cấp</span>
              </span>
            </div>
            <Link
              className="underline cursor-pointer text-gray-600 hover:text-[#FF5A5F] duration-300"
              href="/rooms/ho-chi-minh"
            >
              Hồ Chí Minh, Việt Nam
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel hình ảnh */}
      <RoomImage room={room} />


      {/* Thông tin chi tiết và đặt phòng */}
      <div className="grid grid-cols-1 lg:flex gap-5">
        <div className="basis-7/12 space-y-5">
          <div className="flex justify-between items-center">
            <div className="space-y-3">
              <h3 className="text-xl font-bold">
                Toàn bộ căn hộ. Chủ nhà <span className="underline uppercase">nnhatsang</span>
              </h3>
              <p>3 Khách • Phòng Studio • 1 Phòng ngủ • 1 giường • 1 Phòng tắm</p>
            </div>
            <div className="relative">
              <Image
                className="w-12 h-12 rounded-full object-cover"
                alt="Host profile"
                width={48}
                height={48}
                src="https://avatars.githubusercontent.com/u/93591100?v=4"
              />
              <div className="absolute top-7 left-7">
                <Star className="w-6 h-6 block fill-current text-[#FF5A5F]" />
              </div>
            </div>
          </div>

          <div className="mb-5 w-full h-px bg-gray-300"></div>

          {/* Đặc điểm nổi bật */}
          <div className="space-y-5">
            <div className="flex gap-5">
              <Wifi className="w-6 h-6" />
              <div className="space-y-2">
                <h4 className="text-sm font-bold">Toàn bộ nhà</h4>
                <p className="text-sm text-gray-600 text-justify">
                  Bạn sẽ có chung cư cao cấp cho riêng mình.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <Tv className="w-6 h-6" />
              <div className="space-y-2">
                <h4 className="text-sm font-bold">Vệ sinh tăng cường</h4>
                <p className="text-sm text-gray-600 text-justify">
                  Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng cường 5 bước của Airbnb.{' '}
                  <span className="underline font-bold cursor-pointer">Hiển thị thêm</span>
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <ParkingSquare className="w-6 h-6" />
              <div className="space-y-2">
                <h4 className="text-sm font-bold">Phong là Chủ nhà siêu cấp</h4>
                <p className="text-sm text-gray-600 text-justify">
                  Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <MdIron className="w-6 h-6" />
              <div className="space-y-2">
                <h4 className="text-sm font-bold">Miễn phí hủy trong 48 giờ</h4>
              </div>
            </div>
          </div>

          <div className="mb-5 w-full h-px bg-gray-300"></div>

          {/* Mô tả */}
          <div className="w-full">
            <button className="w-full text-black bg-white border-2 border-black rounded-lg py-3 hover:bg-gray-200 duration-300 flex justify-between items-center px-6">
              <span>Dịch sang tiếng Anh</span>
              <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M20 18h-1.44a.6.6 0 0 1-.4-.12a.8.8 0 0 1-.23-.31L17 15h-5l-1 2.54a.8.8 0 0 1-.22.3a.6.6 0 0 1-.4.14H9l4.55-11.47h1.89zm-3.53-4.31L14.89 9.5a12 12 0 0 1-.39-1.24q-.09.37-.19.69l-.19.56l-1.58 4.19zm-6.3-1.58a13.4 13.4 0 0 1-2.91-1.41a11.46 11.46 0 0 0 2.81-5.37H12V4H7.31a4 4 0 0 0-.2-.56C6.87 2.79 6.6 2 6.6 2l-1.47.5s.4.89.6 1.5H0v1.33h2.15A11.23 11.23 0 0 0 5 10.7a17.2 17.2 0 0 1-5 2.1q.56.82.87 1.38a23.3 23.3 0 0 0 5.22-2.51a15.6 15.6 0 0 0 3.56 1.77zM3.63 5.33h4.91a8.1 8.1 0 0 1-2.45 4.45a9.1 9.1 0 0 1-2.46-4.45"
                />
              </svg>
            </button>
            <p className="text-justify py-3">
              Tự nhận phòng<br />
              Tự nhận phòng bằng khóa thông minh.<br />
              Dinh Long là Chủ nhà siêu cấp<br />
              Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.
            </p>
            <span className="font-bold underline cursor-pointer">Hiển thị thêm</span>
          </div>

          <div className="mb-5 w-full h-px bg-gray-300"></div>
        </div>

        <div className="basis-1/12"></div>

        {/* Form đặt phòng */}
        <div className="basis-4/12 space-y-6 sticky w-full lg:h-[350px] top-32 mb-10">
          <div className="p-6 rounded-lg border-2 border-gray-300 space-y-6 shadow-xl">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <span className="font-bold">${room.giaTien || "28"}</span>/ night
              </div>
              <div>
                <span className="space-x-2 flex items-center justify-center">
                  <Star className="text-[#FF5A5F]" />
                  <span className="text-black font-bold">3.41</span>
                  <span className="underline cursor-pointer text-gray-600 hover:text-[#FF5A5F] duration-300">
                    (58) đánh giá
                  </span>
                </span>
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <div className="cursor-pointer grow p-3 bg-white hover:bg-gray-300 duration-300 rounded-tl-lg border-x-2 border-t-2 border-gray-600">
                  <div className="font-bold">Nhận phòng</div>
                  <div>04-05-2025</div>
                </div>
                <div className="grow-0"></div>
                <div className="cursor-pointer grow p-3 bg-white hover:bg-gray-300 duration-300 rounded-tr-lg border-t-2 border-r-2 border-gray-600">
                  <div className="font-bold">Trả phòng</div>
                  <div>11-05-2025</div>
                </div>
              </div>
              <div className="p-3 border-2 border-gray-600 rounded-b-lg">
                <div className="mb-3 font-bold">Khách</div>
                <div className="flex justify-between items-center">
                  <button className="font-bold w-9 h-9 text-white bg-[#FF5A5F] hover:bg-[#9e3e4e] rounded-full duration-300 flex items-center justify-center">
                    –
                  </button>
                  <div>1 khách</div>
                  <button className="font-bold w-9 h-9 text-white bg-[#FF5A5F] hover:bg-[#9e3e4e] rounded-full duration-300 flex items-center justify-center">
                    +
                  </button>
                </div>
              </div>
            </div>
            <button className="bg-[#FF5A5F] w-full py-3 rounded-lg font-bold text-white duration-300 hover:bg-pink-800">
              Đặt phòng
            </button>
            <p className="text-center text-gray-400">Bạn vẫn chưa bị trừ tiền</p>
            <div className="flex justify-between items-center">
              <p className="underline text-base">${room.giaTien || "28"} X 7 nights</p>
              <p className="font-mono text-lg font-bold">$ {(room.giaTien || 28) * 7}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="underline text-base">Cleaning fee</p>
              <p className="font-mono text-lg font-bold">$ 8</p>
            </div>
            <div className="mb-5 w-full h-px bg-gray-300"></div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">Total before taxes</p>
              <p className="font-mono text-lg font-bold">${(room.giaTien || 28) * 7 + 8}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tiện ích */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Các tiện ích đi kèm</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-x-3">
            <Wifi className="w-5 h-5 inline" />
            <span>Wifi</span>
          </div>
          <div className="space-x-3">
            <Tv className="w-5 h-5 inline" />
            <span>Tivi</span>
          </div>
          <div className="space-x-3">
            <ParkingSquare className="w-5 h-5 inline" />
            <span>Bãi đỗ xe</span>
          </div>
          <div className="space-x-3">
            <MdIron className="w-5 h-5 inline" />
            <span>Bàn ủi</span>
          </div>
          <div className="space-x-3">
            <FaSwimmingPool className="w-5 h-5 inline" />
            <span>Hồ bơi</span>
          </div>
          <div className="space-x-3">
            <FaHandsWash className="w-5 h-5 inline" />
            <span>Máy giặt</span>
          </div>
        </div>
        <button className="w-56 text-black bg-white border-2 border-black rounded-lg p-3 hover:bg-gray-200 duration-300">
          Ẩn bớt tiện nghi
        </button>
      </div>

      <div className="pb-[30px]"></div>
      <div className="mb-5 w-full h-px bg-gray-300"></div>

      {/* Form đánh giá */}
      <form action="">
        <div>
          <div className="flex ml-3 items-center">
            <div className="mr-3">
              <Image
                className="w-10 h-10 rounded-full object-cover"
                alt="User avatar"
                width={40}
                height={40}
                src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              />
            </div>
            <div>
              <h3 className="font-bold">minh</h3>
            </div>
          </div>
          <div className="mt-3 p-3 w-full">
            <textarea
              id="noiDung"
              name="noiDung"
              rows={3}
              className="border p-2 rounded w-full"
              placeholder="Write something..."
            ></textarea>
          </div>
          <div className="flex justify-between mx-3">
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#FF5A5F] text-white duration-200 hover:bg-gray-700"
            >
              Đánh giá
            </button>
            <div></div>
          </div>
        </div>
      </form>

      <div className="mb-5 w-full h-px bg-gray-300"></div>

      {/* Bình luận */}
      <h3 className="font-bold text-xl">Bình luận</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-[300px] overflow-y-auto px-2">
        {comments.map((comment: Comment, index: number) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center gap-3">
              <div>
                <Image
                  alt="User avatar"
                  className="w-12 h-12 rounded-full object-cover"
                  width={48}
                  height={48}
                  src={isValidUrl(comment.avatar)
                    ? comment.avatar
                    : "/placeholder.svg"}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="uppercase font-bold text-sm">{comment.tenNguoiBinhLuan}</span>
                {comment.saoBinhLuan > 0 && (
                  <span className="text-black font-bold flex gap-1">
                    {Array.from({ length: comment.saoBinhLuan }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-custom-rose" />
                    ))}
                  </span>
                )}
                <p className="text-gray-600 text-sm">
                  <time>{formatDateTime(comment.ngayBinhLuan)}</time>
                </p>
              </div>
            </div>
            <div>
              <p className="w-1/2 truncate">{comment.noiDung}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}