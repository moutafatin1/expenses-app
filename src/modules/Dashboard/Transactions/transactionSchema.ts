import { z } from "zod";

export const transactionFormSchema = z.object({
  type: z.union([z.literal("expense"), z.literal("income")]),
  amount: z.string().min(1, "Transaction amount is required"),
});

export type TransactionFormData = z.infer<typeof transactionFormSchema>;
