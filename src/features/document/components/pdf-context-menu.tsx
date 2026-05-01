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

type PdfContextMenuProps = {
    children: ReactNode;
    document: Document;
    onOpen?: () => void;
}

export function PdfContextMenu({ children, document, onOpen }: PdfContextMenuProps) {
    const resolveFileUrl = (path: string) => {
        const rootPath = import.meta.env.VITE_IMAGE_ROOT_PATH || "";
        if (rootPath) {
            return `${rootPath}${path}`;
        }
        if (path.startsWith("http://") || path.startsWith("https://")) {
            try {
                const parsed = new URL(path);
                if (parsed.pathname.startsWith("/storage/")) {
                    return parsed.pathname;
                }
            } catch {
                return path;
            }
        }
        return path;
    };

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onOpen) {
            onOpen();
        } else {
        
            const fileUrl = resolveFileUrl(document.path);
            window.open(fileUrl, '_blank');
        }
    }

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        const fileData = JSON.stringify({
            name: document.originalName,
            id: document.id,
            type: 'pdf',
            path: document.path
        });
        navigator.clipboard.writeText(fileData);
    }

    const handleCut = (e: React.MouseEvent) => {
        e.stopPropagation();
        const fileData = JSON.stringify({
            name: document.originalName,
            id: document.id,
            type: 'pdf',
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

            console.log("Delete PDF:", document.id);
        }
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log("Edit PDF:", document.id);
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
                    <ContextMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Properties</span>
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
