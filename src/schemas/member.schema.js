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

  joined_at: z.preprocess(
    (val) => {
      if (!val) return undefined

      const date = val instanceof Date ? val : new Date(val)

      return isNaN(date.getTime()) ? undefined : date
    },
    z.date({
      required_error: "Vui lòng chọn ngày",
    }),
  ),

  // email: z.string().trim().email("Email không hợp lệ"),
  // phone: z.string().trim().regex(/^\d+$/, "Chỉ được nhập số"),
})
