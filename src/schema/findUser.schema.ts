import { z } from "zod";

const findUserSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string({ required_error: "Last name is required" }),
  dob: z.date({ required_error: "Date of birth is required" }),
});

type FindUserFormType = z.infer<typeof findUserSchema>;

export { findUserSchema, FindUserFormType };
