import { DialogTitle, DialogHeader, DialogContent, Dialog, DialogDescription } from "@/components/ui/dialog";
import { Position } from "@/lib/client/types/types";
import { searchSchema } from "@/lib/client/validator/validatior";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Calendar as CalendarIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { isValidUrl } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

export const LocationDialog = ({
  showLocationModal,
  setShowLocationModal,
  form,
  showSuggestions,
  setShowSuggestions,
  positions,
}: {
  showLocationModal: boolean;
  setShowLocationModal: (value: boolean) => void;
  form: ReturnType<typeof useForm<z.infer<typeof searchSchema>>>;
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
  positions: Position[];
}) => {
  return (
    <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
      <DialogContent className="rounded-lg max-w-xl max-h-[80vh] overflow-y-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Bạn muốn đi đâu?
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-white">
            Vui lòng chọn địa điểm bạn muốn đi
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="m-0">
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      id="location-input"
                      placeholder="Tìm kiếm điểm đến"
                      onClick={() => setShowSuggestions(true)}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={() => {
                        setTimeout(() => setShowSuggestions(false), 200);
                      }}
                      className="w-full rounded-lg border-gray-300 py-5 pl-10 text-base focus-visible:ring-0 focus-visible:outline-none"
                    />
                    <Search className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                    {field.value && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full"
                        onClick={() => form.setValue("location", "")}
                      >
                        <X />
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-20 top-full left-0 w-full max-h-[34vh] overflow-x-hidden overflow-y-auto bg-white shadow-2xl"
              >
                {positions.map((position, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex cursor-pointer items-center p-3 hover:bg-gray-100"
                    onClick={() => {
                      form.setValue("location", position.tenViTri);
                      setShowSuggestions(false);
                      setShowLocationModal(false);
                    }}
                    role="link"
                    tabIndex={0}
                  >
                    <div className="relative mr-3 h-12 w-12 overflow-hidden rounded-lg">
                      <Image
                        src={
                          isValidUrl(position.hinhAnh)
                            ? position.hinhAnh
                            : "/placeholder.svg"
                        }
                        alt={position.tenViTri}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {position.tenViTri}
                      </p>
                      <p className="text-sm text-gray-500">
                        {position.tinhThanh}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Định nghĩa kiểu cho props của DatePickerDialog
interface DatePickerDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  form: ReturnType<typeof useForm<z.infer<typeof searchSchema>>>;
  fieldName: "checkIn" | "checkOut"; // Trường trong form
  title: string; // Tiêu đề dialog
  description: string; // Mô tả dialog
  autoClose?: boolean; // Tự động đóng sau khi chọn ngày
  disabledDate?: (date: Date) => boolean; // Hàm tùy chỉnh để vô hiệu hóa ngày
}

export const DatePickerDialog = ({
  open,
  onOpenChange,
  form,
  fieldName,
  title,
  description,
  autoClose = false,
  disabledDate,
}: DatePickerDialogProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-lg border-0 p-6 shadow-xl md:max-w-[380px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-white">
            {description}
          </DialogDescription>
        </DialogHeader>

        <FormField
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer justify-start rounded-lg border-gray-300 py-3 pl-3 text-left hover:bg-gray-50"
                    >
                      <CalendarIcon className="mr-3 h-5 w-5 text-gray-500 dark:text-white" />
                      <span className="text-gray-700 dark:text-white">
                        {field.value
                          ? formatDate(field.value)
                          : "Chưa chọn ngày"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-full rounded-lg border border-gray-200 p-0 shadow-lg"
                    align="center"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        if (autoClose) {
                          setIsPopoverOpen(false);
                          onOpenChange(false);
                        }
                      }}
                      disabled={
                        disabledDate ||
                        ((date) =>
                          date <=
                          (form.watch("checkIn") ||
                            new Date(new Date().setHours(0, 0, 0, 0))))
                      }
                      initialFocus
                      classNames={{
                        caption: "flex justify-center items-center relative",
                        caption_label: "text-lg font-bold text-rose-500 cursor-default",
                        nav: "flex items-center",
                        nav_button: "w-6 h-6 rounded-full flex items-center justify-center bg-rose-500 text-white hover:bg-rose-700 cursor-pointer",
                        nav_button_previous: "absolute left-2",
                        nav_button_next: "absolute right-2",
                        head_cell: "text-red-500 font-bold flex items-center justify-center w-full py-2",
                        row: "flex gap-1 mt-1",
                        day: "w-10 h-10 rounded-full text-gray-800 hover:bg-gray-100",
                        day_selected: "bg-rose-600 text-white hover:bg-rose-600 hover:text-white",
                        day_today: "border-rose-400 border-2 font-semibold bg-rose-50 text-rose-600 hover:bg-rose-50",
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </DialogContent>
    </Dialog>
  );
};

export const CheckInDialog = ({
  showCheckInModal,
  setShowCheckInModal,
  form,
}: {
  showCheckInModal: boolean;
  setShowCheckInModal: (value: boolean) => void;
  form: ReturnType<typeof useForm<z.infer<typeof searchSchema>>>;
}) => (
  <DatePickerDialog
    open={showCheckInModal}
    onOpenChange={setShowCheckInModal}
    form={form}
    fieldName="checkIn"
    title="Chọn ngày nhận phòng"
    description="Vui lòng chọn ngày bạn muốn nhận phòng"
    autoClose={true}
    disabledDate={(date) =>
      date < new Date(new Date().setHours(0, 0, 0, 0))
    }
  />
);

export const CheckOutDialog = ({
  showCheckOutModal,
  setShowCheckOutModal,
  form,
}: {
  showCheckOutModal: boolean;
  setShowCheckOutModal: (value: boolean) => void;
  form: ReturnType<typeof useForm<z.infer<typeof searchSchema>>>;
}) => (
  <DatePickerDialog
    open={showCheckOutModal}
    onOpenChange={setShowCheckOutModal}
    form={form}
    fieldName="checkOut"
    title="Chọn ngày trả phòng"
    description="Vui lòng chọn ngày bạn muốn trả phòng"
    autoClose={true}
    disabledDate={(date) =>
      date <=
      (form.watch("checkIn") || new Date(new Date().setHours(0, 0, 0, 0)))
    }
  />
);

export const GuestDialog = ({
  showGuestModal,
  setShowGuestModal,
  form
}: {
  showGuestModal: boolean;
  setShowGuestModal: (value: boolean) => void;
  form: ReturnType<typeof useForm<z.infer<typeof searchSchema>>>;
}) => {
  return (
    <Dialog open={showGuestModal} onOpenChange={setShowGuestModal}>
      <DialogContent className="rounded-lg border-0 p-0 shadow-xl sm:max-w-lg">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            Chọn số lượng khách
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-white">
            Đảm bảo chỗ ở phù hợp với số lượng khách của bạn
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 px-6 pb-6">
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Người lớn</p>
                    <p className="text-sm text-gray-500">
                      Từ 13 tuổi trở lên
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 cursor-pointer rounded-full border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      onClick={() => field.onChange(Math.max(0, field.value - 1))}
                      disabled={field.value <= 0}
                    >
                      <span className="inline text-lg">-</span>
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {field.value}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 cursor-pointer rounded-full border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      onClick={() => field.onChange(field.value + 1)}
                    >
                      <span className="inline text-lg">+</span>
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

