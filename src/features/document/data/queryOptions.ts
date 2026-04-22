import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchDocumentService, renameDocumentService, storeDocumentService, updateDocumentService } from "./api"
import type { DocumentForm } from "./schema"
//queryOptions.ts
const Key = "documents"
export const documentQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        queryFn: fetchDocumentService,
        staleTime: 1000 * 60 * 5, // 5 minutes
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
            console.error("Document upload failed:", error)
        },
    })
}