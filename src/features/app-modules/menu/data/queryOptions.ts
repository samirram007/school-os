import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"

import { fetchMenuService, storeMenuService, updateMenuService } from "./api"
import type { MenuForm } from "./schema"

const Key = "Menus"
export const menuQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        queryFn: fetchMenuService,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}
export function useMenuMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data: MenuForm & { id?: number }) => {
            console.log("mutation Data", data)
            if (data.id) {
                // Update if id exists
                return await updateMenuService(data)
            }
            // Otherwise create
            return await storeMenuService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            console.error("Menu mutation failed:", error)
        },
    })
}