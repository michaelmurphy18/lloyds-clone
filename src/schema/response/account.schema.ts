import { z } from "zod";

const accountSchema = z.object({
  accountType: z.string(),
  nameOnAccount: z.string(),
  user: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  overDraftLimit: z.number(),
  balance: z.number(),
  accountNumber: z.string(),
  sortCode: z.string(),
  iban: z.string(),
  bic: z.string(),
  id: z.string(),
});

export default accountSchema;
