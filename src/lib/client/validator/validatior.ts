import { z } from "zod";

export const searchSchema = z.object({
  location: z.string().min(1, "Vui lòng nhập địa điểm"),
  checkIn: z
    .date({ required_error: "Vui lòng chọn ngày nhận phòng" })
    .refine((date) => date >= new Date(), {
      message: "Ngày nhận phòng không được trước ngày hiện tại",
    }),
  checkOut: z.date({ required_error: "Vui lòng chọn ngày trả phòng" }),
  guests: z.number().min(1, "Số lượng khách phải lớn hơn 0"),
}).superRefine((data, ctx) => {
  if (data.checkIn && data.checkOut && data.checkOut <= data.checkIn) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Ngày trả phòng phải sau ngày nhận phòng",
      path: ["checkOut"],
    });
  }
});

export const bookingSchema = z.object({
  id: z.number(),
  maPhong: z.number(),
  ngayDen: z
    .date({ required_error: "Vui lòng chọn ngày nhận phòng" })
    .refine((date) => date >= new Date(), {
      message: "Ngày nhận phòng không được trước ngày hiện tại",
    }),
  ngayDi: z.date({ required_error: "Vui lòng chọn ngày trả phòng" }),
  soLuongKhach: z.number().min(1, "Số lượng khách phải lớn hơn 0"),
  maNguoiDung: z.number().min(1, "Vui lòng đăng nhập để đặt phòng"),
}).superRefine((data, ctx) => {
  if (data.ngayDen && data.ngayDi && data.ngayDi <= data.ngayDen) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Ngày trả phòng phải sau ngày nhận phòng",
      path: ["ngayDi"],
    });
  }
});

export const commentSchema = z.object({
  maPhong: z.number(),
  maNguoiBinhLuan: z.number().min(1, "Vui lòng đăng nhập để bình luận"),
  ngayBinhLuan: z
    .date({ required_error: "Ngày bình luận không hợp lệ" })
  ,
  noiDung: z.string().min(1, "Nội dung bình luận không được để trống"),
  saoBinhLuan: z
    .number()
    .min(1, "Số sao phải từ 1 đến 5")
    .max(5, "Số sao phải từ 1 đến 5"),
});

export const signInSchema = z.object({
  email: z.string().email({ message: 'Vui lòng nhập email hợp lệ' }),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export const signUpSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  email: z.string().email({ message: "Vui lòng nhập email hợp lệ" }),
  password: z.string().min(1, "Vui lòng nhập mật khẩu"),
  phone: z
    .string()
    .min(10, "Vui lòng nhập số điện thoại hợp lệ")
    .regex(/^[0-9]+$/, "Vui lòng nhập số điện thoại hợp lệ"),
  birthday: z.string().min(1, "Vui lòng nhập ngày sinh"),
  gender: z.boolean(),
});
