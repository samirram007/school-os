import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import type { ReactNode } from "react"
import NewFolderButton from "./new-folder-button"

export function BodyContextMenu({ children }: { children: ReactNode }) {
    return (
        <ContextMenu>
            <ContextMenuTrigger className="h-full w-full">
                <span className="hidden pointer-fine:inline-block h-full w-full">
                    {children}
                </span>
                <span className="hidden pointer-coarse:inline-block">
                    Long press here
                </span>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuGroup>
                    <ContextMenuItem>
                        <NewFolderButton />
                        <ContextMenuShortcut>⌘N</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>
                        Cut
                        <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                    </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSub>
                    <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        <ContextMenuGroup>
                            <ContextMenuItem>Save Page...</ContextMenuItem>
                            <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                            <ContextMenuItem>Name Window...</ContextMenuItem>
                        </ContextMenuGroup>
                        <ContextMenuSeparator />
                        <ContextMenuGroup>
                            <ContextMenuItem>Developer Tools</ContextMenuItem>
                        </ContextMenuGroup>
                        <ContextMenuSeparator />
                        <ContextMenuGroup>
                            <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
                        </ContextMenuGroup>
                    </ContextMenuSubContent>
                </ContextMenuSub>
            </ContextMenuContent>
        </ContextMenu>
    )
}
