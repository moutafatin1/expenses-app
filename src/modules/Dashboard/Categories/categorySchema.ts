import { z } from "zod";

export const categoryFormSchema = z.object({
  categoryName: z.string().min(1, "Category name is required"),
  emoji: z.string().min(1, "Emoji is required"),
});

export type categoryFormData = z.infer<typeof categoryFormSchema>;
