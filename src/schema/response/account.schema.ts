import { z } from "zod";

export const accountSchema = z.object({
  accountType: z.string(),
  nameOnAccount: z.string(),
  user: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  overdraftLimit: z.number(),
  balance: z.number(),
  accountNumber: z.string(),
  accountName: z.string(),
  sortCode: z.string(),
  iban: z.string(),
  bic: z.string(),
  id: z.string(),
});

export type Account = z.infer<typeof accountSchema>;

const getAccountSchema = z.object({
  account: accountSchema,
  timeline: z.array(z.string()).nullable(),
});

type GetAccountSchema = z.infer<typeof getAccountSchema>;

export { getAccountSchema, type GetAccountSchema };

const getAllAccountSchema = z.array(
  accountSchema.omit({
    bic: true,
    iban: true,
    overdraftLimit: true,
    nameOnAccount: true,
  }),
);

type GetAllAccountSchema = z.infer<typeof getAllAccountSchema>;

export { getAllAccountSchema, type GetAllAccountSchema };
