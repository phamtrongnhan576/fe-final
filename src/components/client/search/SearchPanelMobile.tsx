"use client";

import { useRef, useState, useEffect } from "react";
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
import { formatDate, isValidUrl, slugify } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { searchSchema } from "@/lib/client/validator/validatior";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setSearch } from "@/lib/client/store/slices/searchSlice";
import { showErrorToast, showSuccessToast } from "@/lib/client/services/notificationService";
import { RootState } from "@/lib/client/store/store";
import { useTranslations } from "next-intl";
const SearchPanelMobile = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const [openCheckIn, setOpenCheckIn] = useState(false);
  const [openCheckOut, setOpenCheckOut] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const positions = useSelector((state: RootState) => state.position);
  const t = useTranslations("Search");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && (suggestionsRef.current as HTMLElement).contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      location: "",
      checkIn: undefined,
      checkOut: undefined,
      guests: 0,
    },
  });

  const onSubmitForm = async (data: z.infer<typeof searchSchema>) => {
    const listSearchs = {
      location: data.location,
      guests: data.guests,
      checkIn: data.checkIn.toISOString(),
      checkOut: data.checkOut.toISOString(),
    }

    dispatch(setSearch(listSearchs))

    const selectedPosition = positions.find(pos => pos.tenViTri === data.location);

    if (!selectedPosition || !selectedPosition.tinhThanh) {
      showErrorToast(t("Search failed"));
      return;
    };

    showSuccessToast(t("Searching"))

    const slug = slugify(selectedPosition.tinhThanh);
    router.push(`/rooms/${slug}`);
    setShowDialog(false);
  };

  return (
    <div className="w-sm mx-auto">
      <Button
        variant="ghost"
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-700 dark:text-white"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowDialog(true)
        }}
      >
        <Search className="h-5 w-5" />
        <span className="text-sm font-medium">{t("Start searching")}</span>
      </Button>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)}>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  {t("Search accommodation")}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Địa điểm */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Location")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="relative">
                            <Input
                              placeholder={t("Search location")}
                              {...field}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowSuggestions(true)
                              }}
                              className="w-full rounded-xl border-gray-300 py-5 pl-10 text-base shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800 dark:text-white
                              dark:placeholder:text-white placeholder:text-sm placeholder:text-gray-700"
                            />
                            <Search className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400 w-4 h-4" />
                            {field.value && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  field.onChange("")
                                }}
                              >
                                <X />
                              </Button>
                            )}
                          </div>
                          <AnimatePresence>
                            {showSuggestions && (
                              <motion.div
                                ref={suggestionsRef}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute z-10 mt-2 max-h-[30vh] w-full overflow-x-hidden overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
                              >
                                {positions.map((position, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex cursor-pointer items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      field.onChange(position.tenViTri);
                                      setShowSuggestions(false);
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
                                      <p className="font-medium text-gray-900 dark:text-white">
                                        {position.tenViTri}
                                      </p>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {position.tinhThanh}
                                      </p>
                                    </div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ngày nhận phòng */}
                <FormField
                  control={form.control}
                  name="checkIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Check-in date")}</FormLabel>
                      <FormControl>
                        <Popover open={openCheckIn} onOpenChange={setOpenCheckIn}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full cursor-pointer justify-start rounded-lg border-gray-300 py-5 pl-10 text-left hover:bg-gray-50 relative"
                            >
                              <CalendarIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                              <span className="ml-6 text-gray-700 dark:text-white">
                                {field.value ? formatDate(field.value) : t("Add date")}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-[325px] rounded-lg border border-gray-200 p-0 shadow-lg dark:bg-gray-800 dark:border-gray-700"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setOpenCheckIn(false);
                              }}
                              disabled={(date) =>
                                date <=
                                (field.value || new Date(new Date().setHours(0, 0, 0, 0)))
                              }
                              initialFocus
                              classNames={{
                                // Header (caption)
                                caption: "flex justify-center items-center relative",
                                caption_label: "text-lg font-bold text-rose-500 dark:text-rose-400 cursor-default",

                                // Navigation buttons (Previous/Next)
                                nav: "flex items-center",
                                nav_button: "w-6 h-6 rounded-full flex items-center justify-center bg-rose-500 text-white hover:bg-rose-700 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer",
                                nav_button_previous: "absolute left-2",
                                nav_button_next: "absolute right-2",

                                // Weekday headers (Mon, Tue,...)
                                head_cell: "text-red-500 dark:text-rose-400 font-bold flex items-center justify-center w-full py-2",

                                // Calendar grid
                                row: "flex gap-1 mt-1",

                                // Normal day
                                day: "w-10 h-10 rounded-full text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700",

                                // Selected day
                                day_selected: "bg-rose-600 text-white hover:bg-rose-600 hover:text-white dark:bg-rose-700 dark:hover:bg-rose-800",

                                // Today
                                day_today: "border-rose-400 border-2 font-semibold bg-rose-50 text-rose-600 hover:bg-rose-50 dark:border-rose-500 dark:bg-gray-800 dark:text-rose-400 dark:hover:bg-gray-700",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ngày trả phòng */}
                <FormField
                  control={form.control}
                  name="checkOut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Check-out date")}</FormLabel>
                      <FormControl>
                        <Popover open={openCheckOut} onOpenChange={setOpenCheckOut}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full cursor-pointer justify-start rounded-lg border-gray-300 py-5 pl-10 text-left hover:bg-gray-50 relative"
                            >
                              <CalendarIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                              <span className="ml-6 text-gray-700 dark:text-white">
                                {field.value ? formatDate(field.value) : "Thêm ngày"}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-[325px] rounded-lg border border-gray-200 p-0 shadow-lg dark:bg-gray-800 dark:border-gray-700"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => {
                                field.onChange(date);
                                setOpenCheckOut(false);
                              }}
                              disabled={(date) => {
                                if (form.watch("checkIn")) return date <= form.watch("checkIn");
                                return date <=
                                  (field.value || new Date(new Date().setHours(0, 0, 0, 0)))
                              }}
                              initialFocus
                              classNames={{
                                // Header (caption)
                                caption: "flex justify-center items-center relative",
                                caption_label: "text-lg font-bold text-rose-500 dark:text-rose-400 cursor-default",

                                // Navigation buttons (Previous/Next)
                                nav: "flex items-center",
                                nav_button: "w-6 h-6 rounded-full flex items-center justify-center bg-rose-500 text-white hover:bg-rose-700 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer",
                                nav_button_previous: "absolute left-2",
                                nav_button_next: "absolute right-2",

                                // Weekday headers (Mon, Tue,...)
                                head_cell: "text-red-500 dark:text-rose-400 font-bold flex items-center justify-center w-full py-2",

                                // Calendar grid
                                row: "flex gap-1 mt-1",

                                // Normal day
                                day: "w-10 h-10 rounded-full text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700",

                                // Selected day
                                day_selected: "bg-rose-600 text-white hover:bg-rose-600 hover:text-white dark:bg-rose-700 dark:hover:bg-rose-800",

                                // Today
                                day_today: "border-rose-400 border-2 font-semibold bg-rose-50 text-rose-600 hover:bg-rose-50 dark:border-rose-500 dark:bg-gray-800 dark:text-rose-400 dark:hover:bg-gray-700",
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Số khách */}
                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Number of guests")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder={t("Add guests")}
                            value={field.value > 0 ? `${field.value} ${t("guests")}` : ""}
                            readOnly
                            className="w-full rounded-lg border-gray-300 py-5 pl-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder:text-white placeholder:text-sm placeholder:text-gray-700"
                          />
                          <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                          <div className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 cursor-pointer rounded-full border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                field.onChange(Math.max(0, field.value - 1))
                              }}
                              disabled={field.value <= 0}
                              type="button"
                            >
                              -
                            </Button>
                            <span className="w-6 text-center">{field.value}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 cursor-pointer rounded-full border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                field.onChange(field.value + 1)
                              }}
                              type="button"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Nút tìm kiếm */}
                <Button
                  type="submit"
                  className="w-full cursor-pointer rounded-lg bg-rose-500 py-5 text-lg font-medium text-white shadow-md hover:bg-rose-600"
                  size="lg"
                >
                  <Search className="mr-2 h-5 w-5" />
                  {t("Search")}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchPanelMobile;
