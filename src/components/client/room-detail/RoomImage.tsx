'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { isValidUrl } from "@/lib/utils";
import Image from 'next/image';

export default function RoomImage({ roomImage }: { roomImage: string }) {
  console.log("roomImage: ", roomImage);

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
              src={isValidUrl(roomImage)
                ? roomImage
                : "/placeholder.svg"}
              alt={`Room image ${index + 1}`}
              className="object-cover rounded-xl w-full"
              width={1280}
              height={450}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

