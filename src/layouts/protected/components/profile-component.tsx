import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "#/components/ui/dropdown-menu";
import { useSidebar } from "#/components/ui/sidebar";
import { BadgeCheck, Bell, CreditCard, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "#/features/base-modules/auth/contexts/auth-context";

export default function ProfileComponent({
    user: _user,
}: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const { isMobile } = useSidebar()
    const { user: authUser, logout } = useAuth()

    const displayUser = {
        name: authUser?.name || _user.name,
        email: authUser?.email || _user.email,
        avatar: _user.avatar
    }

    return (
        <div className="ml-auto ">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>

                    <Avatar className="h-12 w-12    bg-gradient-light
                     rounded-full shadow-md border cursor-pointer">
                        <AvatarImage className="" src={displayUser.avatar} alt={displayUser.name} />
                        <AvatarFallback className="rounded-lg  
                        bg-gray-50/0 text-gray-50 text-xl font-stretch-semi-condensed    ">
                            {displayUser.name?.charAt(0)?.toLocaleUpperCase() || 'U'}
                            {displayUser.name?.charAt(1)?.toLocaleUpperCase() || ''}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    side={isMobile ? "bottom" : "bottom"}
                    align="end"
                    sideOffset={4}
                >
                    <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={displayUser.avatar} alt={displayUser.name} />
                                <AvatarFallback className="rounded-lg">
                                    {displayUser.name?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{displayUser.name}</span>
                                <span className="truncate text-xs">{displayUser.email}</span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Sparkles />
                            Upgrade to Pro
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <BadgeCheck />
                            Account
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CreditCard />
                            Billing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Bell />
                            Notifications
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>
                        <LogOut />
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}