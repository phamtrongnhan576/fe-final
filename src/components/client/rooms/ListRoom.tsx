'use client';

import dynamic from 'next/dynamic';
import { Room, PositionWithSlug } from '@/lib/client/types/types';
import { formatISOToDDMMYYYY } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/client/store/store';
import EmptyState from '../common/EmptyState';
import "@/lib/client/assests/swiper-custom.css"
import RoomCard from './RoomCard';

const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
});

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
    <div className="max-w-md mx-auto sm:container mt-8 md:mt-0">
      <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-3 relative'>
        <div className="md:py-12 space-y-3">
          <p>
            Có {rooms.length} chỗ ở tại {position.tinhThanh} •{" "}
            {formatISOToDDMMYYYY(searchData.checkIn)} –{" "}
            {formatISOToDDMMYYYY(searchData.checkOut)}
          </p>
          <h1 className="font-bold text-xl md:text-3xl text-black dark:text-white ">Chỗ ở tại khu vực bản đồ đã chọn</h1>
          <div className="space-y-6">
            {rooms.map((room, index) => (
              <RoomCard key={room.id} room={room} position={position} index={index} />
            ))}
          </div>
        </div>

        <div className="mb-8 lg:mb-0 lg:h-screen lg:w-[470px] xl:w-xl w-[444px] md:w-[730px] lg:sticky lg:top-0 lg:right-0 lg:mt-32" data-aos="flip-up" data-aos-duration="500">
          <DynamicMap position={position} />
        </div>
      </div>
    </div>
  );
}
