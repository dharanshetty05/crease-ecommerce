import { z } from "zod";

export const listProductsSchema = z.object({
    page: z
        .string()
        .optional()
        .transform((v) => Number(v ?? 1))
        .refine((v) => v > 0, "Page must be positive"),
    limit: z
        .string()
        .optional()
        .transform((v) => Number(v ?? 10))
        .refine((v) => v > 0, "Limit must be positive"),
});

export const productIdSchema = z.object({
    id: z.string().uuid(),
});
