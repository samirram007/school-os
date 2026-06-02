import { ActiveInactiveStatusSchema } from "#/types/active-inactive-status";
import z from "zod";


export const tenantSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    appModule: z.string().min(1),
    code: z.string().optional().nullish(),
    description: z.string().nullish(),
    status: ActiveInactiveStatusSchema.default(ActiveInactiveStatusSchema.options[0].value),

})

export type Tenant = z.infer<typeof tenantSchema>

export const tenantListSchema = z.array(tenantSchema)
export type TenantList = z.infer<typeof tenantListSchema>