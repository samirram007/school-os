
import { z } from 'zod';






export const documentSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1),
  originalName: z.string().min(1),
  link: z.string().nullish(),
  path: z.string().nullish(),
  documentType: z.string().refine((val) => ["file", "image", "folder"].includes(val), {
    message: "documentType must be either 'file' or 'folder'",
  }),
  parentId: z.number().int().positive().nullish(),
  fullPath: z.string().nullish(),
  parents: z.array(z.object({
    id: z.number().int().positive(),
    name: z.string().min(1),
    parentId: z.number().int().positive().nullable(),
    originalName: z.string().min(1),
  })).nullish()




})
export type Document = z.infer<typeof documentSchema>
export type RoleDocument = z.infer<typeof documentSchema>
export const documentListSchema = z.array(documentSchema)
export type DocumentList = z.infer<typeof documentListSchema>



export const formSchema = z
  .object({
    isEdit: z.boolean(),
  })

export type DocumentForm = z.infer<typeof formSchema>