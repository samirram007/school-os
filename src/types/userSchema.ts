import z from "zod";

const userSchema = z.object({
    id: z.number().min(1),
    name: z.string(),
    email: z.string(),
    role: z.string(),
});

export type User = z.infer<typeof userSchema>;