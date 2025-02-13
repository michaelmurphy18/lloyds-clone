import { z } from "zod";

const getCurrentUserSchema = z
  .object({
    // _id: z.string(),
    id: z.string(),
    userId: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    dob: z.string(),
    accounts: z.array(z.string()),
    fullName: z.string(),
  })
  .transform((user) => ({
    ...user,
    dob: new Date(user.dob),
    accountCount: user.accounts?.length ?? 0,
  }));

type CurrentUser = z.infer<typeof getCurrentUserSchema>;

export { getCurrentUserSchema, type CurrentUser };
