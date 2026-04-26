import { RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./features/base-modules/auth/contexts/auth-context";
import * as TanstackQuery from './integrations/tanstack-query/root-provider';
import { getRouter } from "./router";
import LoadingBar from "react-top-loading-bar";

const router = getRouter()
export function AppRouter() {
    const auth = useAuth();
    const { queryClient } = TanstackQuery.getContext();

    if (auth.isLoading) return <LoadingBar />;
    if (auth.isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center p-4">
                <div className="size-10 rounded-full border-4 border-gray-200 border-t-foreground animate-spin" />
            </div>
        )
    }

    return (
        <RouterProvider
            router={router}
            context={{
                auth,
                queryClient,
            }}
        />
    );
}
