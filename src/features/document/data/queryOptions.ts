import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { createFolderService, fetchDocumentService, moveDocumentService, renameDocumentService, storeDocumentService, updateDocumentService } from "./api"
import type { DocumentForm } from "./schema"

//queryOptions.ts
const Key = "documents"
export const documentQueryOptions = (id?: number) => {
    const isRoot = !id

    return queryOptions({
      queryKey: ["documents", isRoot ? "root" : "folder", id ?? "root"],

      queryFn: () =>
          isRoot
              ? fetchDocumentService()
              : fetchDocumentService({ id }),

      enabled: isRoot || !!id, // always true, but keeps intent clear

      staleTime: 1000 * 60 * 5,
      retry: 1,
  })
}
export const documentChildrenQueryOptions = (id?: number) => {
    return queryOptions({
        queryKey: ["documents", "folder", id],
        queryFn: () => fetchDocumentService({ id }),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}

export function useDocumentMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: DocumentForm & { id?: number }) => {
            if (data.id) {
                // Update if id exists
                return await updateDocumentService(data)
            }
            // Otherwise create
            return await storeDocumentService(data as any)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            console.error("Document mutation failed:", error)
        },
    })
}

//rename
export const useRenameDocumentMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, name }: { id: number, name: string }) => {
            return await renameDocumentService({ id, name })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            console.error("Document rename failed:", error)
        },
    })
}
export const useMoveDocumentMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, parentId }: { id: number, parentId: number }) => {
            return await moveDocumentService({ id, parentId })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            console.error("Document move failed:", error)
        },
    })
}

export const useUploadDocumentMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: any) => {
            return await storeDocumentService(payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            //  toast.error("Failed to upload files. Please try again.")
            console.error("ERROR: Document upload failed:", error)
        },
    })
}
export const useCreateFolderMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (payload: any) => {
            return await createFolderService(payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            //  toast.error("Failed to upload files. Please try again.")
            console.error("ERROR: Document upload failed:", error)
        },
    })
}