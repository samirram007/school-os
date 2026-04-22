import { z } from 'zod';



export const folderSchema = z.object({
  id: z.number().int().positive().optional(),
  folderId: z.number().int().positive().optional(),
  parentId: z.number().int().positive().nullable().optional(),
})

export type Folder = z.infer<typeof folderSchema>
export const folderListSchema = z.array(folderSchema)
export type FolderList = z.infer<typeof folderListSchema>


export const documentSchema = z.object({
  id: z.number().int().positive().optional(),



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