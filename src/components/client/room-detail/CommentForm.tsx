"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { commentSchema } from '@/lib/client/validator/validatior';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Star, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from 'react';
import { createComment } from '@/lib/client/services/apiService';
import { handleApiError } from '@/lib/client/services/notificationService';
import { AxiosError } from 'axios';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/client/store/store';

export default function CommentForm({ id }: { id: number }) {
  const user = useSelector((state: RootState) => state.user);
  const userAvatar = user.avatar;
  const userName = user.name;
  
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      maPhong: id,
      maNguoiBinhLuan: 47042,
      ngayBinhLuan: new Date(Date.now()),
      noiDung: "",
      saoBinhLuan: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    try {
      await createComment(data)
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <Avatar className="!h-8 !w-8">
          {userAvatar ? (
            <AvatarImage src={userAvatar} />
          ) : (
            <AvatarFallback className="bg-gradient-to-br from-rose-300 to-rose-500">
              <User className="text-white h-4 w-4" />
            </AvatarFallback>
          )}
        </Avatar>
        <span className="font-semibold text-sm text-gray-600 dark:text-white">
          {userName || "Tài khoản"}
        </span>
      </div>

      <div className="mt-3 p-3 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="saoBinhLuan"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <RatingStars
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1 min-h-[20px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="noiDung"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Textarea
                      placeholder="Nhập bình luận ..."
                      className="min-h-20 max-h-60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1 min-h-[20px]" />
                </FormItem>
              )}
            />
            <div>
              <Button
                type="submit"
                className="px-5 py-2 rounded-lg bg-rose-600 text-white duration-200 hover:bg-rose-700 cursor-pointer"
              >
                Đánh giá
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

interface RatingStarsProps {
  value: number;
  onChange: (value: number) => void;
}

const RatingStars = ({
  value,
  onChange
}: RatingStarsProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            className={cn(
              "h-6 w-6 cursor-pointer",
              starValue <= (hoverValue || value) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            )}
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(null)}
          />
        );
      })}
    </div>
  );
};