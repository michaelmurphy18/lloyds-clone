import { z } from "zod";

const loginFormSchema = z.object({
  userId: z
    .string()
    .min(4, { message: "User ID must be at least 4 characters" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

type LoginForm = z.infer<typeof loginFormSchema>;

export { loginFormSchema, type LoginForm };
