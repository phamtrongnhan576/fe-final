"use client";

import { useState } from "react";
import { Search, User, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
} from "@/components/ui/form";
import { searchSchema } from "@/lib/client/validator/validatior";
import { LocationDialog, CheckInDialog, CheckOutDialog, GuestDialog } from "./searchDialog";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { showErrorToast, showSuccessToast } from "@/lib/client/services/notificationService";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/lib/client/store/slices/searchSlice";
import { RootState } from "@/lib/client/store/store";

export default function SearchPanel() {
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [showGuestModal, setShowGuestModal] = useState<boolean>(false);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const [showCheckInModal, setShowCheckInModal] = useState<boolean>(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const positions = useSelector((state: RootState) => state.position);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      location: "",
      checkIn: undefined,
      checkOut: undefined,
      guests: 0,
    },
  });

  const handleSearch = async (data: z.infer<typeof searchSchema>) => {
    const listSearchs = {
      location: data.location,
      guests: data.guests,
      checkIn: data.checkIn.toISOString(),
      checkOut: data.checkOut.toISOString(),
    }

    dispatch(setSearch(listSearchs))

    const selectedPosition = positions.find(pos => pos.tenViTri === data.location)

    if (!selectedPosition || !selectedPosition.tinhThanh) {
      showErrorToast("Tìm kiếm thất bại!");
      return;
    };

    showSuccessToast("Đang tìm kiếm ...")


    router.push(`/rooms/${selectedPosition.slug}`);
  };

  const handleInvalid = () => {
    const errors = form.formState.errors;
    const errorMessages = [];

    if (errors.location) errorMessages.push(errors.location.message);
    if (errors.checkIn) errorMessages.push(errors.checkIn.message);
    if (errors.checkOut) errorMessages.push(errors.checkOut.message);
    if (errors.guests) errorMessages.push(errors.guests.message);

    if (errorMessages.length > 0) {
      toast.error("Vui lòng kiểm tra các lỗi sau:", {
        description: (
          <ul className="list-disc space-y-1 pl-5 mt-2">
            {errorMessages.map((msg, index) => (
              <li key={`error-${index}`} className="text-sm text-red-600">
                {msg}
              </li>
            ))}
          </ul>
        ),
        duration: 2000,
        className: "!bg-red-50 !text-red-600 !font-bold !border-[3px] !text-lg !border-red-500",
        icon: " ",
        position: "top-right",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSearch, handleInvalid)}
        className="container mx-auto mt-8 flex items-center gap-2 rounded-full border border-gray-400 bg-white px-4 py-2 shadow-md transition-shadow md:mt-0 lg:max-w-5xl dark:border-gray-800 dark:bg-gray-900 dark:shadow-black"
      >
        <Button
          type="button"
          variant="ghost"
          className={cn(
            "h-full flex-1 rounded-full px-4 py-2 text-left transition-all hover:bg-gray-100 hover:shadow-md dark:hover:bg-gray-700 cursor-pointer",
            (form.watch("location") ||
              form.watch("checkIn") ||
              form.watch("checkOut")) &&
            "font-medium"
          )}
          onClick={() => setShowLocationModal(true)}
        >
          <div className="ml-2 flex w-full flex-col">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Địa điểm
            </span>
            <div className="flex items-center gap-2">
              <Search className="text-gray-500 dark:text-gray-400" />
              <span className="truncate text-sm text-gray-800 dark:text-gray-200">
                {form.watch("location") || "Bạn muốn đi đâu?"}
              </span>
            </div>
          </div>
        </Button>

        <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />

        {/* Check-in Button */}
        <Button
          type="button"
          variant="ghost"
          className="h-full flex-1 rounded-full px-4 py-2 text-left transition-all hover:bg-gray-100 hover:shadow-md dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => setShowCheckInModal(true)}
        >
          <div className="ml-2 flex w-full flex-col">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Nhận phòng
            </span>
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {form.watch("checkIn")
                  ? formatDate(form.watch("checkIn"))
                  : "Thêm ngày"}
              </span>
            </div>
          </div>
        </Button>

        <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />

        {/* Check-out Button */}
        <Button
          type="button"
          variant="ghost"
          className="h-full flex-1 rounded-full px-4 py-2 text-left transition-all hover:bg-gray-100 hover:shadow-md dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => setShowCheckOutModal(true)}
        >
          <div className="ml-2 flex w-full flex-col">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Trả phòng
            </span>
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {form.watch("checkOut")
                  ? formatDate(form.watch("checkOut"))
                  : "Thêm ngày"}
              </span>
            </div>
          </div>
        </Button>

        <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />

        {/* Guests Button */}
        <Button
          type="button"
          variant="ghost"
          className="h-full flex-1 rounded-full px-4 py-2 text-left transition-all hover:bg-gray-100 hover:shadow-md dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => setShowGuestModal(true)}
        >
          <div className="ml-2 flex w-full flex-col">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              Khách
            </span>
            <div className="flex items-center gap-2">
              <User className="text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {form.watch("guests") > 0
                  ? `${form.watch("guests")} khách`
                  : "Thêm khách"}
              </span>
            </div>
          </div>
        </Button>

        {/* Search Button */}
        <Button
          type="submit"
          className="flex cursor-pointer items-center gap-2 rounded-full bg-rose-600 py-6 text-white hover:bg-rose-700 hover:shadow-md dark:bg-rose-700 dark:hover:bg-rose-800"
        >
          <Search className="text-white" />
          <span className="font-medium">Tìm kiếm</span>
        </Button>

        {/* Replace the Dialog components with the new components */}
        <LocationDialog
          showLocationModal={showLocationModal}
          setShowLocationModal={setShowLocationModal}
          form={form}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          positions={positions}
        />

        <CheckInDialog
          showCheckInModal={showCheckInModal}
          setShowCheckInModal={setShowCheckInModal}
          form={form}
        />

        <CheckOutDialog
          showCheckOutModal={showCheckOutModal}
          setShowCheckOutModal={setShowCheckOutModal}
          form={form}
        />

        <GuestDialog
          showGuestModal={showGuestModal}
          setShowGuestModal={setShowGuestModal}
          form={form}
        />
      </form>
    </Form>
  );
};
