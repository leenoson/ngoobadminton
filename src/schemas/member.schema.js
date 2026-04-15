import { z } from "zod"

export const memberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tên không được bỏ trống")
    .min(2, "Tên phải có ít nhất 2 ký tự"),

  nickname: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().trim().optional(),
  ),

  level: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().trim().optional(),
  ),

  joined_at: z.string().min(1, "Chọn ngày tham gia"),

  // email: z.string().trim().email("Email không hợp lệ"),
  // phone: z.string().trim().regex(/^\d+$/, "Chỉ được nhập số"),
})
