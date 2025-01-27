import { z } from "zod";

const findUserFormSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string({ required_error: "Last name is required" }),
  dob: z.date({ required_error: "Date of birth is required" }),
});

type FindUserForm = z.infer<typeof findUserFormSchema>;

export { findUserFormSchema, type FindUserForm };
