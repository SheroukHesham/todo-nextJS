import * as z from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(5, "Tile must be at least 5 characters.")
    .max(32, "Title must be at most 32 characters."),
  body: z
    .string()
    .max(100, "Description must be at most 100 characters.")
    .optional(),
  completed: z.boolean().optional(),
});

export type formValues = z.infer<typeof formSchema>;
