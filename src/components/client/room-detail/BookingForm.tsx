"use client";

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Comment, Room } from '@/lib/client/types/types';
import { bookingSchema } from '@/lib/client/validator/validatior';
import { formatDate } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm, useFormContext, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type BookingFormProps = {
  room: Room;
  comments: Comment[];
};

type PriceSummaryProps = {
  price: number;
  nights: number;
  cleaningFee: number;
  total: number;
};

export default function BookingForm({ room, comments }: BookingFormProps) {
  const pricePerNight = room.giaTien;
  const cleaningFee = 8;

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      id: 0,
      maPhong: room.id,
      ngayDen: new Date(Date.now() + 1000 * 60 * 60 * 24),
      ngayDi: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      soLuongKhach: 1,
      maNguoiDung: 47042,
    },
  });

  const calculateNights = () => {
    const checkIn = form.watch('ngayDen');
    const checkOut = form.watch('ngayDi');
    if (checkIn && checkOut) {
      const diffTime = checkOut.getTime() - checkIn.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateAverageRating = () => {
    const totalRating = comments.reduce((sum, comment) => sum + comment.saoBinhLuan, 0);
    const averageRating = (totalRating / comments.length).toFixed(2);
    return averageRating;
  };

  const nights = calculateNights();
  const total = pricePerNight * nights + cleaningFee;


  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    console.log('Booking data:', data);
  };

  return (
    <div className="space-y-6 sticky w-full lg:h-[350px] top-32 mb-10">
      <div className="p-6 rounded-lg border-2 border-gray-300 space-y-6 shadow-xl">
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <span className="font-bold">${pricePerNight}</span>/ night
          </div>
          <div>
            <span className="space-x-2 flex items-center justify-center">
              <Star className="text-rose-600" />
              <span className="text-black font-bold">{calculateAverageRating()}</span>
              <span className="underline cursor-pointer text-gray-600 hover:text-rose-600 duration-300">
                ({comments.length}) đánh giá
              </span>
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DatePicker />
            <GuestCounter form={form} />
            <Button
              type="submit"
              className="bg-rose-600 w-full py-3 rounded-lg font-bold text-white hover:bg-rose-700"
            >
              Kiểm tra tình trạng còn phòng
            </Button>
          </form>
        </Form>

        <p className="text-center text-gray-400">Bạn vẫn chưa bị trừ tiền</p>
        <PriceSummary
          price={pricePerNight}
          nights={nights}
          cleaningFee={cleaningFee}
          total={total}
        />
      </div>
      <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
        <svg
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          className="h-4 w-4 fill-current"
        >
          <path d="m7.5011 1c.5272 0 .9591.40794.99725.92537l.00275.07463v1h5.5c.31265 0 .5435.281645.4935.581075l-.01275.056285-.96125 3.36264.96125 3.36265c.08055.2818-.0967.5625-.36775.62465l-.0554.00945-.0576.00325h-5.5c-.5272 0-.9591-.40795-.99725-.92535l-.00275-.07465v-1h-5v6h-1v-14zm1 3h-1v4h1z" />
        </svg>
        <Link href="/" className="underline hover:text-rose-600">
          Báo cáo nhà/phòng cho thuê này
        </Link>
      </div>
    </div>
  );
}

function DatePicker() {
  const form = useFormContext<z.infer<typeof bookingSchema>>();
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  return (
    <div className="flex gap-2 justify-between items-start">
      <FormField
        control={form.control}
        name="ngayDen"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start items-center rounded-lg border-gray-300 py-3 pl-3 text-left hover:bg-gray-50"
                  >
                    <CalendarIcon className="mr-3 h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">
                      {field.value ? formatDate(field.value) : 'Chọn ngày nhận phòng'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setIsCheckInOpen(false);
                    }}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1 min-h-[20px]" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ngayDi"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormControl>
              <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start items-center rounded-lg border-gray-300 py-3 pl-3 text-left hover:bg-gray-50"
                  >
                    <CalendarIcon className="mr-3 h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">
                      {field.value ? formatDate(field.value) : 'Chọn ngày trả phòng'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setIsCheckOutOpen(false);
                    }}
                    disabled={(date) =>
                      date <= form.watch('ngayDen') || date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1 min-h-[20px]" />
          </FormItem>
        )}
      />
    </div>
  );
}

function GuestCounter({ form }: { form: UseFormReturn<z.infer<typeof bookingSchema>> }) {
  const maxGuests = 10;
  return (
    <div className="p-3 border-2 border-gray-600 rounded-lg">
      <div className="mb-3 font-bold">Khách</div>
      <FormField
        control={form.control}
        name="soLuongKhach"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  className="w-9 h-9 bg-rose-600 hover:bg-rose-700 rounded-full"
                  onClick={() => field.value > 1 && field.onChange(field.value - 1)}
                >
                  –
                </Button>
                <span>{field.value} khách</span>
                <Button
                  type="button"
                  className="w-9 h-9 bg-rose-600 hover:bg-rose-700 rounded-full"
                  onClick={() => field.value < maxGuests && field.onChange(field.value + 1)}
                >
                  +
                </Button>
              </div>
            </FormControl>
            <FormMessage className="text-xs text-center text-red-500 mt-1 min-h-[20px]" />
          </FormItem>
        )}
      />
    </div>
  );
}

function PriceSummary({ price, nights, cleaningFee, total }: PriceSummaryProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <p className="underline text-base">${price} X {nights} nights</p>
        <p className="font-mono text-lg font-bold">${price * nights}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="underline text-base">Cleaning fee</p>
        <p className="font-mono text-lg font-bold">${cleaningFee}</p>
      </div>
      <div className="mb-5 w-full h-px bg-gray-300"></div>
      <div className="flex justify-between items-center">
        <p className="font-bold text-lg">Total before taxes</p>
        <p className="font-mono text-lg font-bold">${total}</p>
      </div>
    </>
  );
}
