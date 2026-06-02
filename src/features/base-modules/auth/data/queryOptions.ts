import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"
import { changePasswordService, loginService, signupService } from "./apis"

const Key = "AUTH"
export const authQueryOptions = (key: string = Key) => {
    return queryOptions({
        queryKey: [key],
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    })
}
export function useLoginMutation() {
    return useMutation({
        mutationFn: async(data: { email: string; password: string }) => { 
            return await loginService(data)
        },
        onError: (error) => {
            console.error("Login mutation failed:", error)
        }
    })
} 

export function useSignupMutation() {
    return useMutation({
        mutationFn: async (data: {
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
        }) => {
            return await signupService(data)
        },
        onError: (error) => {
            console.error("Signup mutation failed:", error)
        }
    })
}

export function useChangePasswordMutation() {


    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: { newPassword: string }) => {

            return await changePasswordService(data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [Key] })
        },
        onError: (error) => {
            console.error("Change password mutation failed:", error)
        },
    })
}

 