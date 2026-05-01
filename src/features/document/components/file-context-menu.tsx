import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import type { ReactNode } from "react"
import { Copy, Scissors, Download, Trash2, FileText } from "lucide-react";
import type { Document } from "../data/schema";

type FileContextMenuProps = {
    children: ReactNode;
    document: Document;
    onOpen?: () => void;
}

export function FileContextMenu({ children, document, onOpen }: FileContextMenuProps) {
    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
          if (!document.path) return;
        
        if (onOpen) {
            onOpen();
        } else {
            const fileUrl = import.meta.env.VITE_IMAGE_ROOT_PATH 
                ? `${import.meta.env.VITE_IMAGE_ROOT_PATH}${document.path}`
                : document.path;
             window.open(fileUrl, '_blank');
        }
    }

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        const fileData = JSON.stringify({
            name: document.originalName,
            id: document.id,
            type: 'file',
            path: document.path
        });
        navigator.clipboard.writeText(fileData);
    }

    const handleCut = (e: React.MouseEvent) => {
        e.stopPropagation();
        const fileData = JSON.stringify({
            name: document.originalName,
            id: document.id,
            type: 'file',
            path: document.path,
            action: 'cut'
        });
        navigator.clipboard.writeText(fileData);
    }

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
       
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm(`Are you sure you want to delete "${document.originalName}"?`)) {
            console.log("Delete file:", document.id);
        }
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
     
        console.log("Edit file:", document.id);
    }

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
            <ContextMenuContent className="w-48">
                <ContextMenuGroup>
                    <ContextMenuItem onClick={handleOpen}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Open</span>
                        <ContextMenuShortcut>⌘O</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={handleEdit}>
                        <span>Edit</span>
                        <ContextMenuShortcut>⌘E</ContextMenuShortcut>
                    </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                    <ContextMenuItem onClick={handleCopy}>
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copy</span>
                        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={handleCut}>
                        <Scissors className="mr-2 h-4 w-4" />
                        <span>Cut</span>
                        <ContextMenuShortcut>⌘X</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download</span>
                    </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                    <ContextMenuItem onClick={handleDelete} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                        <ContextMenuShortcut>⌘Del</ContextMenuShortcut>
                    </ContextMenuItem>
                </ContextMenuGroup>
            </ContextMenuContent>
        </ContextMenu>
    )
}
