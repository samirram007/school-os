

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Outlet } from "@tanstack/react-router"
import Header from "./components/header"
import { SearchProvider } from "./contexts/search-context"
import { AppSidebar } from "./components/app-sidebar"


export default function Page() {
    return (
        <SearchProvider>

        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <Header />
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
        </SearchProvider>
    )
}
