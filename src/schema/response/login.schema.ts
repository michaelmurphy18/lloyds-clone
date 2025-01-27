import { z } from "zod";

const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

type LoginResponse = z.infer<typeof loginResponseSchema>;

export { loginResponseSchema, type LoginResponse };
