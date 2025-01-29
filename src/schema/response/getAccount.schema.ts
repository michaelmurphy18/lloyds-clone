import { z } from "zod";
import accountSchema from "./account.schema";

const getAccountSchema = accountSchema;

type GetAccountSchema = z.infer<typeof getAccountSchema>;

export { getAccountSchema, type GetAccountSchema };
