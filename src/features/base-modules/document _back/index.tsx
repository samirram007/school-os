"use client"
import { Main } from "#/layouts/protected/components/main";
import { useQuery } from "@tanstack/react-query";
import { documentQueryOptions, useMoveDocumentMutation } from "./data/queryOptions";
import UploadButton from "./components/upload-button";
import NewFolderButton from "./components/new-folder-button";
import { useDocument } from "./contexts/document-context";
import { Suspense, useMemo } from "react";
import PdfComponent from "./components/pdf-component";
import FolderComponent from "./components/folder-component";
import FileComponent from "./components/file-component";

import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors  } from "@dnd-kit/core";
import type {DragEndEvent} from "@dnd-kit/core";
import { Loader, LayoutGrid, List, FileText, Image as ImageIcon, ChevronDown, Search, ArrowDownUp } from "lucide-react";
import { BodyContextMenu } from "./components/body-context-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import AppImage from "#/components/app-image";
import folderIcon from '@/assets/folder.png';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const pathSymbol = " > "
export default function DocumentPage() {
    const { viewMode, setViewMode, searchQuery, setSearchQuery, sortBy, setSortBy } = useDocument();

    return (
        <Main>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200/70 bg-white/80 px-4 py-3 shadow-sm dark:border-white/[0.07] dark:bg-white/5">
                <div className="space-y-1 self-center">
                    <DoucmentPath />
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <div className="relative w-48">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-8" />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2"><ArrowDownUp size={16} /> {sortBy}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setSortBy('name')}>Name</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy('createdAt')}>Date</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy('size')}>Size</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy('type')}>Type</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                {viewMode === 'grid' ? <LayoutGrid size={16} /> : <List size={16} />}
                                {viewMode === 'grid' ? 'Grid' : 'List'}
                                <ChevronDown size={14} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setViewMode('grid')}><LayoutGrid size={16} className="mr-2" /> Grid</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setViewMode('list')}><List size={16} className="mr-2" /> List</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <NewFolderButton />
                    <UploadButton />
                </div>
            </div>
            <BodyContextMenu>
                <DocumentBodyComponent />
            </BodyContextMenu>
        </Main>
    )
}

const DoucmentPath = () => {
    const { currentFolder, setCurrentFolder } = useDocument();

    const pathSegments = useMemo(() => {
        if (!currentFolder) return [];
        const parents = currentFolder.parents?.sort((a, b) => (b.depth ?? 0) - (a.depth ?? 0)) || [];
        return [
            ...parents,
            { id: currentFolder.id, name: currentFolder.name, originalName: currentFolder.originalName, parentId: currentFolder.parentId, parents: parents.slice(0, parents.length - 1), depth: 0 },
        ];
    }, [currentFolder]);

    const handleClick = (folder: any) => {
        setCurrentFolder({
            id: folder.id,
            parentId: folder.parentId ?? null,
            documentType: "folder",
            name: folder.name,
            originalName: folder.originalName,
            parents: pathSegments?.slice(0, pathSegments.findIndex((seg) => seg.id === folder.id)),
        });
    }

    return (
        <p className="text-slate-600 dark:text-slate-400">
            <span onClick={() => setCurrentFolder(null)} className="cursor-pointer hover:underline">{" root " + pathSymbol}</span>
            {pathSegments.map((segment, index) => {
                const isLast = index === pathSegments.length - 1;
                return (
                    <span key={segment.id}>
                        {!isLast ? (
                            <span className="cursor-pointer hover:underline" onClick={() => handleClick(segment)}>{segment.originalName}</span>
                        ) : (
                                <span className="font-semibold">{segment.originalName}</span>
                        )}
                        {index < pathSegments.length - 1 && " " + pathSymbol + " "}
                    </span>
                );
            })}
        </p>
    );
};

const DocumentBodyComponent = () => {
    const { currentFolder, viewMode, searchQuery, sortBy } = useDocument();
    const fetchedDocuments = useQuery(documentQueryOptions(currentFolder?.id));

    const documents = useMemo(() => {
        let docs = fetchedDocuments.data?.data || [];
        if (searchQuery) {
            docs = docs.filter((d: any) => d.originalName.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        docs = [...docs].sort((a: any, b: any) => {
            if (sortBy === 'name') return a.originalName.localeCompare(b.originalName);
            if (sortBy === 'createdAt') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            if (sortBy === 'size') return (b.size || 0) - (a.size || 0);
            return a.documentType.localeCompare(b.documentType);
        });
        return docs;
    }, [searchQuery, sortBy, fetchedDocuments.data]);

    return (
        <Suspense fallback={<Loader size={16} className="animate-spin" />}>
            {documents.length === 0 ?
                <div className="min-h-screen h-full flex-1 rounded-xl bg-muted/50 p-8">
                    <div className="flex items-center justify-center h-full"><p className="text-lg text-gray-500">No documents</p></div>
                </div>
                : viewMode === 'grid' ? <DocumentGrid documents={documents} /> : <DocumentList documents={documents} />
            }
        </Suspense>
    )
}

const DocumentList = ({ documents }: { documents: any[] }) => {
    const { selectedIds, toggleSelect } = useDocument();
    const fileRootPath = import.meta.env.VITE_IMAGE_ROOT_PATH || "http://localhost:8000/documents/";

    const getIcon = (doc: any) => {
        if (doc.documentType === 'folder') return <AppImage src={folderIcon} className="w-8 h-8 object-contain" />;
        if (doc.documentType === 'image') return <AppImage src={fileRootPath + doc.path} className="w-8 h-8 object-cover rounded" />;
        if (doc.path?.toLowerCase().endsWith('.pdf')) return <FileText className="w-8 h-8 text-red-500" />;
        return <ImageIcon className="w-8 h-8 text-blue-500" />;
    };

    return (
        <div className="min-h-screen h-full flex-1 rounded-xl bg-muted/50 p-4">
            <div className="bg-white rounded-lg border shadow-sm">
                <table className="w-full text-sm">
                    <thead className="border-b bg-muted/20">
                        <tr>
                            <th className="p-3 w-10"></th>
                            <th className="text-left p-3">Name</th>
                            <th className="text-left p-3">Type</th>
                            <th className="text-left p-3">Size</th>
                            <th className="text-left p-3">Uploaded</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc: any) => (
                            <tr key={doc.id} className={`border-b last:border-0 hover:bg-muted/30 ${selectedIds.includes(doc.id) ? 'bg-blue-50' : ''}`}>
                                <td className="p-3"><Checkbox checked={selectedIds.includes(doc.id)} onCheckedChange={() => toggleSelect(doc.id)} /></td>
                                <td className="p-3 font-medium flex items-center gap-3">{getIcon(doc)} {doc.originalName}</td>
                                <td className="p-3 text-muted-foreground capitalize">{doc.documentType}</td>
                                <td className="p-3 text-muted-foreground">{doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : '-'}</td>
                                <td className="p-3 text-muted-foreground">{doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
type DragData = {
    type: string;
    document: any;
};
const DocumentGrid = ({ documents }: { documents: any[] }) => {
    const moveMutation = useMoveDocumentMutation();
    // const { selectedIds, toggleSelect } = useDocument();
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 150,
                tolerance: 5,
            },
        })
    );
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const dragged = active.data.current as DragData;
        const target = over.data.current as DragData;

        if (target?.type !== "folder") return;

        const draggedDoc = dragged?.document;
        const targetFolder = target.document;

        if (draggedDoc.id === targetFolder.id) return;

        // 🚀 move API
        moveMutation.mutate({ id: draggedDoc.id, parentId: targetFolder.id }, {
            onSuccess: () => {
                toast.success("Move sueccessfully complete")
            }
        });
    };

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="min-h-screen h-full flex-1 rounded-xl bg-muted/50 md:min-h-min p-8">
                <div className="flex flex-row flex-wrap gap-8">
                    {documents.map((doc: any) => (
                        <div key={doc.id} className="relative group">
                            {/* <Checkbox className="absolute top-1 left-1 z-10 opacity-0 group-hover:opacity-100" checked={selectedIds.includes(doc.id)} onCheckedChange={() => toggleSelect(doc.id)} /> */}
                            <DocumentItem document={doc} />
                        </div>
                    ))}
                </div>
            </div>
        </DndContext>
    )
}

const DocumentItem = ({ document }: { document: any }) => {
    const isFolder = document.documentType === "folder";

    const { listeners, attributes, setNodeRef } = useDraggable({
        id: `doc-${document.id}`, 
        data: { document } 
    });
    const { setNodeRef: setDropRef } = useDroppable({
        id: `folder-${document.id}`, 
        data: { type: "folder", document },
        disabled: !isFolder 
    });

    const Component = useMemo(() => {
        if (document.documentType === "folder") return FolderComponent;
        return (document.path?.toLowerCase().endsWith(".pdf") || document.documentType === "pdf") ? PdfComponent : FileComponent;
    }, [document.documentType, document.path]);

    return (
        <div ref={(node) => { setNodeRef(node); if (isFolder) setDropRef(node); }} >
            <Component
                document={document}
                dragListeners={listeners}
                dragAttributes={attributes} 
            />
        </div>
    );
}
