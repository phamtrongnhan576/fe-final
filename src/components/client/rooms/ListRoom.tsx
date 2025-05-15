'use client';

import dynamic from 'next/dynamic';
import { Room, PositionWithSlug } from '@/lib/client/types/types';
import { formatISOToDDMMYYYY } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/client/store/store';
import "@/lib/client/assests/swiper-custom.css"
import RoomCard from './RoomCard';
import { useTranslations } from 'next-intl';


const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
});

export default function ListRoom({ rooms, position }: { rooms: Room[]; position: PositionWithSlug }) {
  const searchData = useSelector((state: RootState) => state.search);
  const t = useTranslations('ListRoom');

  return (
    <div className="max-w-md mx-auto sm:container mt-8 md:mt-0">
      <div className='grid grid-cols-1 lg:grid-cols-2 md:gap-3 relative'>
        <div className="md:py-12 space-y-3">
          <p>
            {t('found_accommodations', { count: rooms.length, location: position.tinhThanh })} •{" "}
            {formatISOToDDMMYYYY(searchData.checkIn)} –{" "}
            {formatISOToDDMMYYYY(searchData.checkOut)}
          </p>
          <h1 className="font-bold text-xl md:text-3xl text-black dark:text-white ">{t('stays_in_selected_map_area')}</h1>
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
