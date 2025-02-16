import { reverseSortCodeFormatter } from "@/libs/utils";
import { z } from "zod";

const createPayeeFormSchema = z.object({
  name: z.string({
    required_error: "Please enter a valid payee name",
  }),
  // .max(16, { message: "Payee name must be less than 16 characters" }),
  sortCode: z
    .string({
      required_error: "Please enter a valid sort code",
    })
    .transform(reverseSortCodeFormatter) // remove hyphens
    .refine(
      (val) => {
        return /^[0-9]{6}$/.test(val); // check if the string is a 6-digit number
      },
      { message: "Please enter a valid sort code" },
    ),
  accountNumber: z
    .string({
      required_error: "Please enter a valid account number",
    })
    .refine(
      (val) => {
        return /^[0-9]{8}$/.test(val); // check if the string is a 8-digit number
      },
      { message: "Please enter a valid account number" },
    ),
  business: z.boolean().optional().default(false),
});

type CreatePayeeForm = z.infer<typeof createPayeeFormSchema>;

export { createPayeeFormSchema, type CreatePayeeForm };
