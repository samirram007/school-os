import { queryOptions } from "@tanstack/react-query"
import { fetchTenantService } from "./api"

const Key = "Tenant"
export const tenantQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        queryFn: fetchTenantService,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}