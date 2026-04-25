import { Separator } from "#/components/ui/separator";
import { SidebarTrigger } from "#/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

import BreadcrumbComponent from "./breadcrumb-component";
import ProfileComponent from "./profile-component";
import { Calendar, Folder } from "lucide-react";
import { IconCalendarFilled, IconFolderFilled } from "@tabler/icons-react";


export default function Header() {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="w-full flex items-center justify-between gap-2 px-4  ">
                <div className="flex items-center gap-2">

                    <SidebarTrigger className="-ml-1" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <BreadcrumbComponent />
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex flex-row ">
                        <div className="px-1 py-1  text-sm font-medium text-gray-700 hover:text-gradient data-[state=open]:bg-gradient" aria-label={'Calender'}>
                            <Link to={'/document'} >
                                <IconCalendarFilled className="mr-1  shadow-2xl " size={36} />
                            </Link>
                        </div>
                        <div className="px-1 py-1  text-sm font-medium text-gray-700 hover:text-gradient data-[state=open]:bg-gradient" aria-label={'Documents'}>
                            <Link to={'/document'} >
                                <IconFolderFilled className="mr-1  shadow-2xl " size={36} />
                            </Link>
                        </div>

                        {/* <button className="px-3 py-1 rounded-md bg-gradient-light text-sm font-medium text-gray-700 hover:bg-gradient data-[state=open]:bg-gradient">
                            Open Document
                        </button> */}

                    </div>
                    <ProfileComponent user={{
                        name: "John Doe",
                        email: "john.doe@example.com",
                        avatar: "/avatars/john-doe.png"
                    }} />
                </div>
            </div>
        </header >
    )
}