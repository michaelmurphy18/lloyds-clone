import { z } from "zod";
import accountSchema from "./account.schema";

const getAllAccountSchema = z.array(
  accountSchema.omit({
    bic: true,
    iban: true,
    overDraftLimit: true,
    nameOnAccount: true,
  }),
);

type GetAllAccountSchema = z.infer<typeof getAllAccountSchema>;

export { getAllAccountSchema, type GetAllAccountSchema };
