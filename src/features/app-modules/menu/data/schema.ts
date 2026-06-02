
import { ActiveInactiveStatusSchema } from '#/types/active-inactive-status';
import { z } from 'zod';



export const menuSchema: z.ZodType<any> = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  code: z.string().optional().nullish(),
  description: z.string().nullish(),
  status: ActiveInactiveStatusSchema.default(ActiveInactiveStatusSchema.options[0].value),


})

export type Menu = z.infer<typeof menuSchema>

export const menuListSchema = z.array(menuSchema)
export type MenuList = z.infer<typeof menuListSchema>


export const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  code: z.string().min(1, { message: 'Code is required.' }).nullish(),
  status: z.string().min(1, { message: 'Status is required.' }),

  description: z.string().min(1, { message: 'Description is required.' }).nullish(),

  isEdit: z.boolean(),
})
export type MenuForm = z.infer<typeof formSchema>