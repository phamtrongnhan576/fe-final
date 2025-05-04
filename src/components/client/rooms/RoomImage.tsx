"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { isValidUrl } from "@/lib/utils";
import Image from 'next/image';
import { Room } from '@/lib/client/types/types';

export default function RoomImage({room}: {room: Room}) {
  return (
        <div className="w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{ clickable: true }}
            navigation
            className="rounded-xl"
          >
            {[1, 2, 3, 4, 5].map((_, index: number) => (
              <SwiperSlide key={index}>
                <Image
                  alt={`Room image ${index + 1}`}
                  className="object-cover rounded-xl w-full"
                  width={1280}
                  height={450}

                  src={isValidUrl(room.hinhAnh)
                    ? room.hinhAnh
                    : "/placeholder.svg"}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
  );
}

