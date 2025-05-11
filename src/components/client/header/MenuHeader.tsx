"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, User, X } from "lucide-react";
import Link from "next/link";
import { useMenuDropdown } from "../hooks/useMenuDropdown";
import { useForm } from "react-hook-form";
import { signInSchema, signUpSchema } from "@/lib/client/validator/validatior";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { signIn, signUp } from "@/lib/client/services/apiService";
import { handleApiError, showSuccessToast } from "@/lib/client/services/notificationService";
import { AxiosError } from "axios";
import { convertToISODate }  from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { clearUser, setUser } from "@/lib/client/store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/client/store/store";

type MenuHeaderProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const MenuHeader = ({ visible, setVisible }: MenuHeaderProps) => {
  const { theme, setTheme, dropdownOpen, setDropdownOpen, dropdownRef } =
    useMenuDropdown();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const userName = user.name;

  const formSignIn = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formSignUp = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: undefined,
    },
  });

  const onSubmitFormSignIn = async (data: z.infer<typeof signInSchema>) => {
    try {
      const res = await signIn(data);
      dispatch(setUser(res.user));

      if (res.token) {
        showSuccessToast("Đăng nhập thành công!");
        setShowModal(false);
      }
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  };

  const onSubmitFormSignUp = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const formattedData = {
        ...data,
        birthday: data.birthday ? convertToISODate(data.birthday) : undefined,
      };
      await signUp(formattedData);
      showSuccessToast("Đăng ký thành công!");
      setShowSignInModal(false);
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  };

  const handleOpenLoginModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
    setDropdownOpen(false);
  };

  const handleOpenSignupModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSignInModal(true);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("authToken");
    showSuccessToast("Đăng xuất thành công!");
  };

  return (
    <div className="flex items-center gap-3 md:gap-4">
      {/* Theme Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-gray-700 dark:text-gray-300 hover:bg-red dark:hover:bg-transparent rounded-full transition-colors cursor-pointer"
      >
        {theme === "dark" ? (
          <Sun className="!h-5 !w-5 text-white" />
        ) : (
          <Moon className="!h-5 !w-5 text-white" />
        )}
      </Button>

      {/* User Dropdown */}
      <div className="flex relative" ref={dropdownRef}>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 rounded-full hover:bg-transparent dark:hover:bg-transparent transition-colors px-3 py-1 cursor-pointer"
            >
              <Avatar className="!h-8 !w-8">
                <AvatarFallback className="bg-gradient-to-br from-rose-300 to-rose-500">
                  <User className="text-white h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm text-white">
                {userName || "Tài khoản"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700"
              >
                {userName ? (
                  <>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm cursor-pointer"
                    >
                      Trang cá nhân
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm cursor-pointer"
                    >
                      Cài đặt
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <Button
                      variant="ghost"
                      className="w-full inline-block text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm cursor-pointer"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={handleOpenLoginModal}
                      className="w-full inline-block text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm cursor-pointer"
                    >
                      Đăng nhập
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleOpenSignupModal}
                      className="w-full inline-block text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm cursor-pointer"
                    >
                      Đăng ký
                    </Button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </DropdownMenu>
      </div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden">
        <Button
          variant="ghost"
          onClick={() => setVisible(!visible)}
          className="hover:bg-red dark:hover:bg-transparent rounded-full transition-colors cursor-pointer"
        >
          {visible ? (
            <X className="!h-5 !w-5 text-white" />
          ) : (
            <Menu className="!h-5 !w-5 text-white" />
          )}
        </Button>
      </div>

      {/* Login Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Đăng nhập</DialogTitle>
            <DialogDescription className="text-center">
              Chào mừng bạn trở lại
            </DialogDescription>
          </DialogHeader>
          <Form {...formSignIn}>
            <form onSubmit={formSignIn.handleSubmit(onSubmitFormSignIn)} className="space-y-4">
              <FormField
                control={formSignIn.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Nhập email của bạn"
                        {...field}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignIn.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nhập mật khẩu"
                        {...field}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-rose-500 hover:bg-rose-600 rounded-lg py-2 cursor-pointer"
                >
                  Đăng nhập
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-center text-sm">
            Chưa có tài khoản?{" "}
            <button
              type="button"
              className="text-rose-500 hover:underline cursor-pointer"
              onClick={() => {
                setShowModal(false);
                setShowSignInModal(true);
              }}
            >
              Đăng ký ngay
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Registration Modal */}
      <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
        <DialogContent className="sm:max-w-lg rounded-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Đăng ký tài khoản</DialogTitle>
            <DialogDescription className="text-center">
              Tạo tài khoản mới của bạn
            </DialogDescription>
          </DialogHeader>
          <Form {...formSignUp}>
            <form onSubmit={formSignUp.handleSubmit(onSubmitFormSignUp)} className="space-y-4">
              <FormField
                control={formSignUp.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập họ tên đầy đủ"
                        {...field}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Nhập email của bạn"
                        {...field}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Tạo mật khẩu"
                        {...field}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={formSignUp.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập số điện thoại"
                        {...field}
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <div className="flex-1">
                  <FormField
                    control={formSignUp.control}
                    name="birthday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày sinh</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập ngày sinh (DD/MM/YYYY)"
                            {...field}
                            value={field.value || ""}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={formSignUp.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giới tính</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value === "true")}
                          value={field.value === undefined ? undefined : field.value ? "true" : "false"}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-lg cursor-pointer w-full">
                              <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true" className="cursor-pointer">Nam</SelectItem>
                            <SelectItem value="false" className="cursor-pointer">Nữ</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 rounded-lg py-2 cursor-pointer"
              >
                Đăng ký
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm">
            Đã có tài khoản?{" "}
            <button
              type="button"
              className="text-rose-500 hover:underline cursor-pointer"
              onClick={() => {
                setShowSignInModal(false);
                setShowModal(true);
              }}
            >
              Đăng nhập ngay
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuHeader;