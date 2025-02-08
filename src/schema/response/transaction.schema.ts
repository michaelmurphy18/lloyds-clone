import { z } from "zod";

export const getTransactionTimelineSchema = z.array(z.string());

export type GetTransactionTimeline = z.infer<
  typeof getTransactionTimelineSchema
>;

export const getTransactionMonthlySummarySchema = z.object({
  summary: z.object({
    incoming: z.number().positive(),
    outgoing: z.number().negative(),
  }),
});

export type GetTransactionMonthlySummary = z.infer<
  typeof getTransactionMonthlySummarySchema
>;
