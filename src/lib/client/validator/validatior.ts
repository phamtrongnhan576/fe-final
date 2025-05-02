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
