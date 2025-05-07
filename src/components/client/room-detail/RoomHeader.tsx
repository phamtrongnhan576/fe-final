import { Room } from '@/lib/client/types/types';
import { Star } from 'lucide-react';
import Link from "next/link";

export default function RoomHeader({ room }: {room: Room}) {
  return (
    <>
      {/* Room title */}
      <h2 className="font-bold text-3xl pt-4">
        {room.tenPhong || "NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!"}
      </h2>

      {/* Basic information */}
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
    </>
  );
}