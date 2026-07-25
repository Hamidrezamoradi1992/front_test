import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),

  password: z.string().min(1, "رمز عبور الزامی است"),
});
