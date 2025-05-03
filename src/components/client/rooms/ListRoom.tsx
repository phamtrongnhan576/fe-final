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
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Heart } from 'lucide-react';
import { Room, Position } from '@/lib/client/types/types';
import { isValidUrl } from '@/lib/utils';

const mapContainerStyle = {
  width: '100%',
  height: 'calc(-112px + 100vh)',
};

const center = {
  lat: 10.7769,
  lng: 106.7009,
};

const filterPosition = (id: number): { lat: number, lng: number } => {
  switch (id) {
    case 1:
      return { lat: 10.0452, lng: 105.7469 }
    case 3:
      return { lat: 12.2388, lng: 109.1967 }
    case 4:
      return { lat: 21.0285, lng: 105.8048 }
    case 5:
      return { lat: 10.2249, lng: 103.9572 }
    case 6:
      return { lat: 16.0544, lng: 108.2022 }
    case 7:
      return { lat: 11.9404, lng: 108.4580 }
    case 8:
      return { lat: 10.9807, lng: 108.2551 }
    default:
      return { lat: 10.0452, lng: 105.7469 }
  }
}

const concatDevice = (mayGiat: boolean, banLa: boolean, tivi: boolean, dieuHoa: boolean, wifi: boolean, bep: boolean, doXe: boolean, banUi: boolean) => {
  const listDevice = []
  if (mayGiat) {
    listDevice.push("Máy giặt")
  }

  if (banLa) {
    listDevice.push("Bàn là")
  }

  if (tivi) {
    listDevice.push("Tivi")
  }

  if (dieuHoa) {
    listDevice.push("Điều hòa")
  }

  if (wifi) {
    listDevice.push("Wifi")
  }

  if (bep) {
    listDevice.push("Bếp")
  }

  if (doXe) {
    listDevice.push("Đỗ xe")
  }

  if (banUi) {
    listDevice.push("Bàn ủi")
  }

  return listDevice.join(' • ')
}

export default function ListRoom({ rooms, position }: { rooms: Room[]; position: Position }) {
  return (
    <div className="mx-auto container grid grid-cols-1 lg:grid-cols-2 gap-3">
      {/* Left Section: Room Listings */}
      <div className="py-12 space-y-3">
        <p>Có {rooms.length} chỗ ở tại Hồ Chí Minh • 04/05/2025 – 11/05/2025</p>
        <h1 className="font-bold text-3xl text-black">Chỗ ở tại khu vực bản đồ đã chọn</h1>
        <div className="space-y-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} position={position} />
          ))}
        </div>
      </div>

      {/* Right Section: Map */}
      <div className="h-screen w-full sticky top-28 mt-16">
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={13}
          >
            {rooms.map((room) => (
              <Marker
                key={room.id}
                position={filterPosition(room.maViTri)}
                title={room.tenPhong}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

function RoomCard({ room, position }: { room: Room; position: Position }) {
  return (
    <Link href={`/room-detail/${room.id}`}>
      <Card className="rounded-[20px] hover:shadow-lg transition-shadow duration-300 mb-5">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Image Carousel */}
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
                      src={
                        isValidUrl(room.hinhAnh)
                          ? room.hinhAnh
                          : "/placeholder.svg"
                      }
                      alt={room.tenPhong}
                      width={289}
                      height={192}
                      className="object-cover w-full h-48"
                      style={{ objectPosition: '10% center' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute top-3 left-3 z-30">
                <div className="rounded-xl px-3 py-2 bg-white/90">Guest favorite</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 z-30 hover:bg-transparent"
              >
                <Heart className='text-white !h-6 !w-6 fill-gray-500 ' />
              </Button>
            </div>
            {/* Room Info */}
            <div>
              <div>
                <p className="text-gray-500 text-sm truncate">`Toàn bộ căn hộ dịch vụ tại ${position.tenViTri}`</p>
                <p className="truncate text-xl">{room.tenPhong}</p>
              </div>
              <div className="w-[15%] bg-gray-300 h-[3px] rounded-lg my-2" />
              <p className="text-gray-500 text-sm truncate">
                {room.khach} khách • {room.phongNgu} phòng ngủ • {room.giuong} giường • {room.phongTam} phòng tắm
              </p>
              <p className="text-gray-500 text-sm truncate">
                {concatDevice(room.mayGiat, room.banLa, room.tivi, room.dieuHoa, room.wifi, room.bep, room.doXe, room.banUi)}
              </p>
              <div className="text-right mt-12 text-sm">
                <span className="font-bold">${room.giaTien}</span> / đêm
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}