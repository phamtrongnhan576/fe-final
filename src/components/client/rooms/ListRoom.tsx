'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Heart } from 'lucide-react';
import { Room, Position, PositionWithSlug } from '@/lib/client/types/types';
import { formatISOToDDMMYYYY, isValidUrl } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/client/store/store';
import EmptyState from '../common/EmptyState';
import "@/lib/client/assests/swiper-custom.css"

const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-[80vh] rounded-2xl bg-gray-200 animate-pulse" />
});

const concatDevice = (mayGiat: boolean, banLa: boolean, tivi: boolean, dieuHoa: boolean, wifi: boolean, bep: boolean, doXe: boolean, banUi: boolean) => {
  const listDevice = [];
  if (mayGiat) listDevice.push("Máy giặt");
  if (banLa) listDevice.push("Bàn là");
  if (tivi) listDevice.push("Tivi");
  if (dieuHoa) listDevice.push("Điều hòa");
  if (wifi) listDevice.push("Wifi");
  if (bep) listDevice.push("Bếp");
  if (doXe) listDevice.push("Đỗ xe");
  if (banUi) listDevice.push("Bàn ủi");
  return listDevice.join(' • ');
};

export default function ListRoom({ rooms, position }: { rooms: Room[]; position: PositionWithSlug }) {
  const searchData = useSelector((state: RootState) => state.search);

  if (rooms.length === 0) {
    return (
      <EmptyState
        icon="home"
        title="Không tìm thấy chỗ ở phù hợp"
        description={`Chúng tôi không tìm thấy chỗ ở nào tại ${position.tinhThanh} trong khoảng thời gian bạn chọn.`}
        actionText="Thử lại"
      />
    );
  }

  return (
    <div className="max-w-md mx-auto md:container mt-8 md:mt-0">
      <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-3'>
        <div className="md:py-12 space-y-3">
          <p>
            Có {rooms.length} chỗ ở tại {position.tinhThanh} •{" "}
            {formatISOToDDMMYYYY(searchData.checkIn)} –{" "}
            {formatISOToDDMMYYYY(searchData.checkOut)}
          </p>
          <h1 className="font-bold text-xl md:text-3xl text-black dark:text-white ">Chỗ ở tại khu vực bản đồ đã chọn</h1>
          <div className="space-y-6">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} position={position} />
            ))}
          </div>
        </div>

        <div className="mb-8 lg:mb-0 lg:h-screen w-full lg:sticky lg:top-0 lg:right-0 lg:mt-32">
          <DynamicMap position={position} />
        </div>
      </div>
    </div>
  );
}

function RoomCard({ room, position }: { room: Room; position: Position }) {
  return (
    <Link href={`/room-detail/${room.id}`}>
      <Card className="rounded-3xl hover:shadow-lg transition duration-300 mb-5 dark:bg-gray-800 dark:hover:bg-gray-700">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 gap-3">
            <div className="relative">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                className="h-48 rounded-lg"
              >
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={isValidUrl(room.hinhAnh) ? room.hinhAnh : "/placeholder.svg"}
                      alt={room.tenPhong}
                      fill
                      className="object-cover"
                      priority
                      style={{ objectPosition: '8px center' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute top-3 left-3 z-30">
                <div className="rounded-xl px-3 py-2 bg-white/90 dark:bg-gray-800/90">Guest favorite</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 z-30 hover:bg-transparent dark:hover:bg-transparent cursor-pointer"
              >
                <Heart className='text-white !h-6 !w-6 fill-gray-500 ' />
              </Button>
            </div>
            <div>
              <p className="text-gray-500 text-sm truncate dark:text-white">Toàn bộ căn hộ dịch vụ tại {position.tinhThanh}</p>
              <p className="truncate md:text-xl dark:text-white text-lg">{room.tenPhong}</p>
              <div className="w-[15%] bg-gray-300 h-[3px] rounded-lg md:my-2 my-4" />
              <p className="text-gray-500 text-sm truncate dark:text-white">
                {room.khach} khách • {room.phongNgu} phòng ngủ • {room.giuong} giường • {room.phongTam} phòng tắm
              </p>
              <p className="text-gray-500 text-sm truncate dark:text-white">
                {concatDevice(room.mayGiat, room.banLa, room.tivi, room.dieuHoa, room.wifi, room.bep, room.doXe, room.banUi)}
              </p>
              <div className="text-right md:mt-12 mt-3 text-sm">
                <span className="font-bold">${room.giaTien}</span> / đêm
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
