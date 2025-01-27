import { accountType } from "@/constants";
import { z } from "zod";

// const accountType = ["current", "credit", "loan", "mortgage"] as const;

const findUserIdFormSchema = z.object({
  accountType: z.enum(accountType),
  sortCode: z
    .string({ required_error: "Sort code is required" })
    .length(8, "Sort code is must be 6 digits"),
  accountNumber: z.string().length(8, "Account number is must be 8 digits"),
  firstName: z.string({ required_error: "First name is required" }),
  lastName: z.string({ required_error: "Last name is required" }),
  dateOfBirth: z.date(),
});

type FindUserIdForm = z.infer<typeof findUserIdFormSchema>;

export { findUserIdFormSchema, type FindUserIdForm };
