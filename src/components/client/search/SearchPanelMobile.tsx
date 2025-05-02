"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, User, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Position } from "@/lib/client/types/types";
import { isValidUrl } from "@/lib/utils";

interface SearchPanelClientProps {
  positions: Position[];
}

const SearchPanelMobile = ({ positions }: SearchPanelClientProps) => {
  const [showDialog, setShowDialog] = useState(false);
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleGuestsChange = (delta: number) => {
    setGuests((prev) => Math.max(0, prev + delta));
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "short",
    });
  };

  const clearInput = () => setLocation("");

  return (
    <div className="w-full">
      <Button
        variant="ghost"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-white"
        onClick={() => setShowDialog(true)}
      >
        <Search className="h-5 w-5" />
        <span className="text-sm font-medium">Bắt đầu tìm kiếm</span>
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Tìm kiếm chỗ ở
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Địa điểm */}
            <div className="space-y-2">
              <div className="relative">
                <label
                  htmlFor="location-input"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Địa điểm
                </label>
                <div className="relative">
                  <Input
                    id="location-input"
                    placeholder="Tìm kiếm điểm đến"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 200)
                    }
                    className="w-full rounded-lg border-gray-300 py-5 pl-10 text-base focus-visible:ring-0 focus-visible:outline-none dark:bg-gray-900 dark:text-white"
                    aria-describedby="location-description"
                  />
                  <Search className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                  {location && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full"
                      onClick={clearInput}
                      aria-label="Xóa nội dung nhập"
                    >
                      <X />
                    </Button>
                  )}
                </div>
                <AnimatePresence>
                  {showSuggestions && (
                    <div className="absolute z-10 mt-2 max-h-[30vh] w-full overflow-x-hidden overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-xl dark:bg-gray-900">
                      {positions.map((position, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          className="flex cursor-pointer items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => {
                            setLocation(position.tenViTri);
                            setShowSuggestions(false);
                          }}
                          role="link"
                          tabIndex={0}
                        >
                          <Image
                            src={ isValidUrl(position.hinhAnh)
                              ? position.hinhAnh
                              : "/placeholder.svg"}
                            alt={position.tenViTri}
                            width={48}
                            height={48}
                            className="mr-3 h-12 w-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {position.tenViTri}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {position.tinhThanh}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Ngày check-in */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Ngày nhận phòng</label>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer justify-start rounded-lg border-gray-300 py-5 pl-10 text-left hover:bg-gray-50"
                    >
                      <CalendarIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <span className="ml-6 text-gray-700 dark:text-white">
                        {checkIn ? formatDate(checkIn) : "Thêm ngày"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[325px] rounded-lg border border-gray-200 p-0 shadow-lg"
                    align="end"
                    side="bottom"
                    sideOffset={5}
                  >
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="w-full p-3"
                      classNames={{
                        day_selected: "bg-rose-600 text-white",
                        day_today: "border-rose-600 font-bold",
                        nav_button: "size-1.5rem",
                      }}
                      styles={{
                        caption: {
                          padding: "0.5rem 0",
                          fontSize: "1rem",
                          fontWeight: "500",
                          color: "#111827",
                        },
                        caption_label: {
                          textTransform: "capitalize",
                        },
                        head_cell: {
                          padding: "0.5rem 0",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#6b7280",
                        },
                        cell: {
                          padding: "0.25rem",
                        },
                        day: {
                          borderRadius: "6px",
                          width: "2rem",
                          height: "2rem",
                          fontSize: "0.875rem",
                        },
                        nav_button: {
                          width: "1.5rem",
                          height: "1.5rem",
                        },
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Ngày check-out */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Ngày trả phòng</label>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer justify-start rounded-lg border-gray-300 py-5 pl-10 text-left hover:bg-gray-50"
                    >
                      <CalendarIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <span className="ml-6 text-gray-700 dark:text-white">
                        {checkOut ? formatDate(checkOut) : "Thêm ngày"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[325px] rounded-lg border border-gray-200 p-0 shadow-lg"
                    align="end"
                    side="bottom"
                    sideOffset={5}
                  >
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      disabled={(date) =>
                        date <=
                        (checkIn || new Date(new Date().setHours(0, 0, 0, 0)))
                      }
                      initialFocus
                      className="w-full p-3"
                      classNames={{
                        day_selected: "bg-rose-600 text-white",
                        day_today: "border-rose-600 font-bold",
                        nav_button: "size-1.5rem",
                      }}
                      styles={{
                        caption: {
                          padding: "0.5rem 0",
                          fontSize: "1rem",
                          fontWeight: "500",
                          color: "#111827",
                        },
                        caption_label: {
                          textTransform: "capitalize",
                        },
                        head_cell: {
                          padding: "0.5rem 0",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#6b7280",
                        },
                        cell: {
                          padding: "0.25rem",
                        },
                        day: {
                          borderRadius: "6px",
                          width: "2rem",
                          height: "2rem",
                          fontSize: "0.875rem",
                        },
                        nav_button: {
                          width: "1.5rem",
                          height: "1.5rem",
                        },
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Số khách */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Số khách</label>
              <div className="relative">
                <Input
                  placeholder="Thêm khách"
                  value={guests > 0 ? `${guests} khách` : ""}
                  readOnly
                  className="w-full rounded-lg border-gray-300 py-5 pl-10"
                />
                <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleGuestsChange(-1)}
                    disabled={guests <= 0}
                  >
                    -
                  </Button>
                  <span className="w-6 text-center">{guests}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleGuestsChange(1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Nút tìm kiếm */}
            <Button
              className="w-full cursor-pointer rounded-lg bg-rose-500 py-5 text-lg font-medium text-white shadow-md hover:bg-rose-600"
              size="lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Tìm kiếm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchPanelMobile;
