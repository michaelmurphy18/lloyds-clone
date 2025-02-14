import { sortCodeFormatter } from "@/libs/utils";
import { z } from "zod";

const payeeSchema = z
  .object({
    _id: z.string(),
    name: z.string(),
    accountNumber: z.string(),
    sortCode: z.string().transform(sortCodeFormatter),
    business: z.boolean(),
  })
  .transform(({ _id, ...payee }) => ({
    ...payee,
    id: _id,
  }));

export type Payee = z.infer<typeof payeeSchema>;

export const getPayeeSchema = z.object({
  payees: z.array(payeeSchema),
  totalCount: z.number(),
  nextCursor: z
    .object({
      name: z.string(),
      id: z.string(),
    })
    .nullable(),
});

export type GetPayees = z.infer<typeof getPayeeSchema>;
