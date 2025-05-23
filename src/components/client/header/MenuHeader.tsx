"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { convertToISODate } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { clearUser } from "@/lib/client/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { clearSearch } from "@/lib/client/store/slices/searchSlice";
import { useTranslations } from "next-intl";

type MenuHeaderProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

const MenuHeader = ({ visible, setVisible }: MenuHeaderProps) => {
  const { theme, setTheme, dropdownOpen, setDropdownOpen, dropdownRef } =
    useMenuDropdown();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);
  const t = useTranslations("Header");
  const tToast = useTranslations("Toast");
  const dispatch = useDispatch();

  const userLocalStorage = localStorage.getItem("user");
  const userParsed = userLocalStorage ? JSON.parse(userLocalStorage) : null;

  const userName = userParsed?.name;
  const userAvatar = userParsed?.avatar;

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

      if (res.token) {
        showSuccessToast(tToast("Login success"));
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
      showSuccessToast(tToast("Signup success"));
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
    localStorage.removeItem("user");

    dispatch(clearSearch());

    showSuccessToast(tToast("Logout success"));
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
                {userAvatar ? (
                  <AvatarImage src={userAvatar} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-rose-300 to-rose-500">
                    <User className="text-white h-4 w-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="font-medium text-sm text-white">
                {userName || t("Account")}
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
                      href="/under-dev"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm cursor-pointer"
                    >
                      {t("Profile")}
                    </Link>


                    {userParsed?.role === "ADMIN" && (
        <Link
          href="/admin"
          className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm cursor-pointer"
        >
          {t("Admin Page")}
        </Link>
      )}
                 
                    <Link
                      href="/under-dev"
                      className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm cursor-pointer"
                    >
                      {t("Settings")}
                    </Link>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <Button
                      variant="ghost"
                      className="w-full inline-block text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm cursor-pointer"
                      onClick={handleLogout}
                    >
                      {t("Logout")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={handleOpenLoginModal}
                      className="w-full inline-block text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm cursor-pointer"
                    >
                      {t("Login")}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleOpenSignupModal}
                      className="w-full inline-block text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 text-sm cursor-pointer"
                    >
                      {t("Signup")}
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
            <DialogTitle className="text-2xl font-bold text-center">{t("Login")}</DialogTitle>
            <DialogDescription className="text-center">
              {t("Welcome back")}
            </DialogDescription>
          </DialogHeader>
          <Form {...formSignIn}>
            <form onSubmit={formSignIn.handleSubmit(onSubmitFormSignIn)} className="space-y-4">
              <FormField
                control={formSignIn.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("Enter email")}
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
                    <FormLabel>{t("Password")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("Enter password")}
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
                  {t("Login")}
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-center text-sm">
            {t("No account")}?{" "}
            <button
              type="button"
              className="text-rose-500 hover:underline cursor-pointer"
              onClick={() => {
                setShowModal(false);
                setShowSignInModal(true);
              }}
            >
              {t("Signup")}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Registration Modal */}
      <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
        <DialogContent className="sm:max-w-lg rounded-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">{t("Signup account")}</DialogTitle>
            <DialogDescription className="text-center">
              {t("Create account")}
            </DialogDescription>
          </DialogHeader>
          <Form {...formSignUp}>
            <form onSubmit={formSignUp.handleSubmit(onSubmitFormSignUp)} className="space-y-4">
              <FormField
                control={formSignUp.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("Enter name")}
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
                    <FormLabel>{t("Email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("Enter email")}
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
                    <FormLabel>{t("Password")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={t("Enter password")}
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
                    <FormLabel>{t("Phone")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("Enter phone")}
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
                        <FormLabel>{t("Birthday")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="DD/MM/YYYY"
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
                        <FormLabel>{t("Gender")}</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value === "true")}
                          value={field.value === undefined ? undefined : field.value ? "true" : "false"}
                        >
                          <FormControl>
                            <SelectTrigger className="rounded-lg cursor-pointer w-full text-md">
                              <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="true" className="cursor-pointer">{t("Male")}</SelectItem>
                            <SelectItem value="false" className="cursor-pointer">{t("Female")}</SelectItem>
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
                {t("Signup")}
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm">
            {t("Have account")}?{" "}
            <button
              type="button"
              className="text-rose-500 hover:underline cursor-pointer"
              onClick={() => {
                setShowSignInModal(false);
                setShowModal(true);
              }}
            >
              {t("Login now")}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuHeader;